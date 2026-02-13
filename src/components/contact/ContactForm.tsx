"use client";
import React, { FormEvent, useState } from "react";
import {} from "next";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // optional helper for classnames
import { useTranslations } from "next-intl";
import { getMessage } from "@/lib/message";

interface IProps {
  className?: string;
}

export default function ContactForm({ className = "" }: IProps) {
  const contactDict = useTranslations("contact");

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function validate() {
    if (!name.trim()) return contactDict("form.name.invalid");
    if (!company.trim()) return contactDict("form.company.invalid");
    if (!phone.trim()) return contactDict("form.phone.invalid");
    if (!email.trim()) return contactDict("form.email.invalid");
    // simple email check
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
      return contactDict("form.email.invalid");
    if (!message.trim()) return contactDict("form.message.invalid");
    if (message.length > 2000) return contactDict("form.message.maxLength");
    return "";
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSuccess("");

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      const id = await getMessage(name, company, phone, email, message);

      setName("");
      setCompany("");
      setPhone("");
      setEmail("");
      setMessage("");

      if (id < 0) {
        setError(contactDict("form.error"));
      } else {
        setSuccess(contactDict("form.success"));
      }
    } catch (err) {
      setError((err as Error).message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className={cn("mx-auto w-full", className)}>
      <CardHeader>
        <CardTitle>{contactDict("form.title")}</CardTitle>
        <CardDescription>{contactDict("form.description-1")}</CardDescription>
        <CardDescription>{contactDict("form.description-2")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{contactDict("form.name.label")}</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={contactDict("form.name.placeholder")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">{contactDict("form.company.label")}</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder={contactDict("form.company.placeholder")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">{contactDict("form.phone.label")}</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={contactDict("form.phone.placeholder")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{contactDict("form.email.label")}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={contactDict("form.email.placeholder")}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{contactDict("form.message.label")}</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={contactDict("form.message.placeholder")}
              required
              className="min-h-[120px]"
            />
            <div className="mt-1 text-sm text-muted-foreground">
              {message.length}/2000
            </div>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {success && <div className="text-sm text-green-600">{success}</div>}

          <div className="flex items-center justify-end gap-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full xl:w-auto"
            >
              {loading
                ? contactDict("form.sending")
                : contactDict("form.submit")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
