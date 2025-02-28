import { Button } from "@/components/ui/button"
import { Input } from "../../components/ui/input"

export default function NewsletterSignup() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get Creative Insights Delivered</h2>
      <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
        Subscribe to our newsletter for weekly design tips, industry trends, and creative inspiration.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Input type="email" placeholder="Enter your email" className="max-w-md flex-1" />
        <Button type="submit" size="lg">
          Subscribe
        </Button>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        By subscribing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}

