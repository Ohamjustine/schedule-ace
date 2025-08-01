import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Overview = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] py-6 md:py-8 px-2">
      <div className="w-full max-w-lg p-4 md:p-8 ">
        <h2 className="text-xl md:text-3xl font-bold text-center mb-2 text-blue-500">
          Contact Us
        </h2>
        <p className="text-center text-sm md:text-md text-muted-foreground mb-8">
          We&apos;d love to hear from you! Fill out the form below and our team
          will get back to you as soon as possible.
        </p>
        <form className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="name"
              className="block mb-1 text-sm md:text-md font-medium text-foreground"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm md:text-md mb-1 font-medium text-foreground"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@email.com"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm md:text-md mb-1 font-medium text-foreground"
            >
              Subject
            </label>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="Subject"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-1 text-sm md:text-md font-medium text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Type your message..."
              className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] placeholder:text-muted-foreground text-foreground resize-none min-h-[120px]"
            />
          </div>
          <Button type="submit" className="w-full mt-2 bg-blue-500">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};
