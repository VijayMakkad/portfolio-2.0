'use client'

import { useEffect, useState, FormEvent } from 'react';
import { useTheme } from 'next-themes';
import emailjs from '@emailjs/browser';
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "../../hooks/use-toast";

export default function ContactPage() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    // Initialize EmailJS with your user ID
    emailjs.init("u9xBEFql84WizMKro");
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkTheme = theme === 'dark' || resolvedTheme === 'dark';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        "service_scttsvv",
        "template_qow6c28",
        {
          from_name: name,
          from_email: email,
          message: message,
        }
      );

      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        duration: 5000,
      });

      // Clear form fields
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className={`w-full max-w-4xl md:w-[44.5%] shadow-lg ${isDarkTheme ? 'bg-zinc-900/90 text-white' : 'bg-white text-zinc-900'} p-4 md:p-8 space-y-6 md:space-y-8`}>
        {/* Header Section */}
        <div className="space-y-6">
          <div className="flex sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className={`${isDarkTheme ? 'text-zinc-400' : 'text-zinc-600'} flex items-center gap-2`}>
              <span className={`w-1.5 h-1.5 ${isDarkTheme ? 'bg-zinc-400' : 'bg-zinc-600'} rounded-full`} />
              Hire Me
            </span>
            <span className={`${isDarkTheme ? 'bg-green-950/30 text-green-500' : 'bg-green-100 text-green-700'} text-sm px-3 py-1 rounded-full flex items-center gap-2`}>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              AVAILABLE FOR WORK
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Let's Collaborate!</h1>
            <p className={isDarkTheme ? 'text-zinc-400' : 'text-zinc-600'}>Have a project or idea? Let's create something extraordinary together. Reach out now!</p>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                placeholder="Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`${isDarkTheme ? 'bg-zinc-800/50 border-zinc-700 text-white' : 'bg-zinc-100 border-zinc-300 text-zinc-900'} placeholder:text-zinc-500`}
              />
              <Input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`${isDarkTheme ? 'bg-zinc-800/50 border-zinc-700 text-white' : 'bg-zinc-100 border-zinc-300 text-zinc-900'} placeholder:text-zinc-500`}
              />
            </div>
            <Textarea 
              placeholder="Message" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className={`${isDarkTheme ? 'bg-zinc-800/50 border-zinc-700 text-white' : 'bg-zinc-100 border-zinc-300 text-zinc-900'} placeholder:text-zinc-500 min-h-[150px]`}
            />
            <Button 
              type="submit"
              disabled={isLoading}
              className={`w-full ${isDarkTheme ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-900 text-white hover:bg-zinc-800'}`}
            >
              {isLoading ? 'Sending...' : 'Submit'}
            </Button>
          </form>
        </div>
        <Footer />
      </Card>
    </div>
  );
}

