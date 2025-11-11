import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema, type InsertContactSubmission } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function SignUp() {
  const { toast } = useToast();

  const form = useForm<InsertContactSubmission>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: InsertContactSubmission) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out! I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertContactSubmission) => {
    submitMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-accent/5 to-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4" data-testid="heading-signup">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground" data-testid="text-signup-subtitle">
              Let's discuss your next web design project
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle data-testid="text-form-title">Send Me a Message</CardTitle>
              <CardDescription data-testid="text-form-description">
                Fill out the form below and I'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            data-testid="input-fullname"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.email@example.com"
                            data-testid="input-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+1234567890"
                            data-testid="input-phone"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message / Inquiry</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell me about your project..."
                            className="min-h-32 resize-none"
                            data-testid="input-message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={submitMutation.isPending}
                    data-testid="button-submit"
                  >
                    {submitMutation.isPending ? "Sending..." : "Submit"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
