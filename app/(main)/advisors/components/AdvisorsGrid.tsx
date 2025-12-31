"use client";

import { useState, useEffect } from "react";
import AdvisorCard from "./AdvisorCard";
import { AdvisorItem } from "../api/api";
import { filterAdvisors, getUniqueRoles } from "../api/filter";

interface AdvisorsGridProps {
  advisors: AdvisorItem[];
}

export default function AdvisorsGrid({ advisors: initialAdvisors }: AdvisorsGridProps) {
  const [advisors, setAdvisors] = useState<AdvisorItem[]>(initialAdvisors);
  const [filters, setFilters] = useState({
    search: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  // Apply filters when they change
  useEffect(() => {
    setLoading(true);
    const filtered = filterAdvisors(initialAdvisors, filters);
    setAdvisors(filtered);
    setLoading(false);
  }, [filters, initialAdvisors]);

  const uniqueRoles = getUniqueRoles(initialAdvisors);

  const clearFilters = () => {
    setFilters({
      search: "",
      role: "",
    });
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="bg-white p-6 rounded-lg border border-zinc-200 shadow-sm">
        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              Search Advisors
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search by name, role, or description..."
              className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Role Filter */}
          {uniqueRoles.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Filter by Role
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters({ ...filters, role: "" })}
                  className={`px-3 py-1.5 text-sm rounded-full border ${
                    filters.role === ""
                      ? "bg-amber-500 text-white border-amber-500"
                      : "bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200"
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
                        ? "bg-amber-500 text-white border-amber-500"
                        : "bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters & Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
            <div className="space-y-2">
              {(filters.search || filters.role) && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-600">Active filters:</span>
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
                </div>
              )}
              <p className="text-sm text-zinc-500">
                Showing {advisors.length} of {initialAdvisors.length} advisors
              </p>
            </div>
            
            {(filters.search || filters.role) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm font-medium text-zinc-700 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors"
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      ) : (
        /* Advisors Grid */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {advisors.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-zinc-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-700 mb-2">No advisors found</h3>
              <p className="text-zinc-500 mb-4">
                {filters.search || filters.role
                  ? "Try adjusting your filters"
                  : "No advisors available at the moment"}
              </p>
              {(filters.search || filters.role) && (
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            advisors.map((advisor) => (
              <AdvisorCard key={advisor.id} advisor={advisor} />
            ))
          )}
        </div>
      )}
    </div>
  );
}