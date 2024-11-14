'use client';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function StayUpdatedDialog() {
  const saveEmailAndMessage = useMutation(api.emails.saveEmailAndMessage);
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    message: yup.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: { email: string; message?: string }) => {
    await saveEmailAndMessage(data);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4">
          Stay Updated
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[350px] sm:max-w-[425px] rounded-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Stay Updated</DialogTitle>
            <DialogDescription>
              Enter your email to reach out and receive updates about Subconscious Systems.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <div className="col-span-3">
                <Input {...register('email')} type="email" placeholder="you@example.com" />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-right">
                Message (optional)
              </Label>
              <div className="col-span-3">
                <Textarea
                  {...register('message')}
                  placeholder="I have an inference workload I'd like to optimize..."
                />
                {errors.message && (
                  <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving Email...' : 'Submit Email'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function Home() {
  const getAllPrompts = useQuery(api.prompts.getAllPrompts);
  const getAllPromptsCount = useQuery(api.prompts.getAllPromptsCount);
  const submitPrompt = useMutation(api.prompts.saveEmailAndPrompt);

  const validationSchema = yup.object().shape({
    prompt: yup
      .string()
      .required('Prompt is required')
      .max(500, 'Prompt must be less than 500 characters'),
    email: yup.string().email('Invalid email').required('Email is required'),
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    defaultValues: {
      prompt: '',
      email: '',
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: { prompt: string; email: string }) => {
    await submitPrompt(data);
    reset();
  };

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)] relative">
      <div className="relative z-10">
        <div className="max-w-xl mx-auto pt-12" id="demo">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8 bg-white animate-[fade-in-down_0.4s_ease-out_forwards] opacity-0 delay-500">
            <h2 className="text-lg font-semibold mb-2">
              Try Our First Product: Free Stable Diffusion Generation
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Submit an image prompt, and we will generate an image for you with Stable Diffusion at
              a time when it's cheapest for us to run. We're generating the first 1000 images free
              and aiming to cut our costs 70%+ vs. hosted instances on replicate or Together AI.
              Submit a prompt now, and we'll send you an email when it's ready (submit up to 10
              prompts).
            </p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <textarea
                  {...register('prompt')}
                  placeholder="Enter your prompt..."
                  className="w-full p-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
                {errors.prompt && <p className="text-sm text-red-500">{errors.prompt.message}</p>}
              </div>
              <div className="space-y-2">
                <input
                  {...register('email')}
                  type="email"
                  placeholder="Enter your email..."
                  className="w-full p-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>
              <Button
                type="submit"
                className="w-full text-base font-medium"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Prompt For Generation'}
              </Button>
            </form>
          </div>
        </div>

        <div className="max-w-xl mx-auto mt-12">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-2">Pending Prompts</h3>
            <p className="text-muted-foreground mb-2 border-b pb-8">
              We're generating our first 1000 images free.
            </p>
            {getAllPrompts?.map((prompt: any) => (
              <div
                key={prompt._id}
                className="py-2 border-b last:border-b-0 text-muted-foreground text-sm"
              >
                <div>{prompt.prompt}</div>
                <div className="text-xs text-muted-foreground mt-1">By {prompt.email}</div>
              </div>
            ))}
            {getAllPromptsCount && getAllPromptsCount > 5 && (
              <p className="text-sm text-muted-foreground mt-2">
                +{getAllPromptsCount - 5} more prompts submitted
              </p>
            )}
          </div>
        </div>
      </div>

      <footer className="relative z-10 text-center text-sm text-muted-foreground">
        <div className="flex gap-2 items-center justify-center">
          <p>Subconscious Systems © 2024</p>
          <Image src="/android-chrome-192x192.png" alt="MIT" width={20} height={20} />
        </div>
      </footer>
    </div>
  );
}
