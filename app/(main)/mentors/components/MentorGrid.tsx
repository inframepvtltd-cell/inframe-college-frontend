"use client";

import { useState, useEffect } from "react";
import MentorCard from "./MentorCard";
import { MentorItem } from "../api/api";
import { filterMentors, getUniqueRoles, getUniqueExpertise } from "../api/filter";

interface MentorsGridProps {
  mentors: MentorItem[];
}

export default function MentorsGrid({ mentors: initialMentors }: MentorsGridProps) {
  const [mentors, setMentors] = useState<MentorItem[]>(initialMentors);
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    expertise: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  // Apply filters when they change
  useEffect(() => {
    setLoading(true);
    const filtered = filterMentors(initialMentors, filters);
    setMentors(filtered);
    setLoading(false);
  }, [filters, initialMentors]);

  const uniqueRoles = getUniqueRoles(initialMentors);
  const uniqueExpertise = getUniqueExpertise(initialMentors);

  const handleExpertiseToggle = (skill: string) => {
    setFilters(prev => {
      const newExpertise = prev.expertise.includes(skill)
        ? prev.expertise.filter(s => s !== skill)
        : [...prev.expertise, skill];
      
      return { ...prev, expertise: newExpertise };
    });
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      role: "",
      expertise: [],
    });
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Mentors
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search by name, role, or expertise..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Role Filter */}
          {uniqueRoles.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Role
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters({ ...filters, role: "" })}
                  className={`px-3 py-1.5 text-sm rounded-full border ${
                    filters.role === ""
                      ? "bg-yellow-500 text-white border-yellow-500"
                      : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                  }`}
                >
                  All Roles
                </button>
                {uniqueRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setFilters({ ...filters, role })}
                    className={`px-3 py-1.5 text-sm rounded-full border ${
                      filters.role === role
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Expertise Filter */}
          {uniqueExpertise.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Filter by Expertise
                </label>
                {filters.expertise.length > 0 && (
                  <button
                    onClick={() => setFilters({ ...filters, expertise: [] })}
                    className="text-sm text-yellow-600 hover:text-yellow-700"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {uniqueExpertise.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleExpertiseToggle(skill)}
                    className={`px-3 py-1.5 text-sm rounded-full border ${
                      filters.expertise.includes(skill)
                        ? "bg-yellow-500 text-white border-yellow-500"
                        : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters & Stats */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="space-y-2">
              {(filters.search || filters.role || filters.expertise.length > 0) && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Active filters:</span>
                  {filters.search && (
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Search: {filters.search}
                    </span>
                  )}
                  {filters.role && (
                    <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                      Role: {filters.role}
                    </span>
                  )}
                  {filters.expertise.map(skill => (
                    <span key={skill} className="text-sm bg-purple-100 text-purple-800 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-500">
                Showing {mentors.length} of {initialMentors.length} mentors
              </p>
            </div>
            
            {(filters.search || filters.role || filters.expertise.length > 0) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
        </div>
      ) : (
        /* Mentors Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mentors.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No mentors found</h3>
              <p className="text-gray-500 mb-4">
                {filters.search || filters.role || filters.expertise.length > 0
                  ? "Try adjusting your filters"
                  : "No mentors available at the moment"}
              </p>
              {(filters.search || filters.role || filters.expertise.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            mentors.map((mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} />
            ))
          )}
        </div>
      )}
    </div>
  );
}