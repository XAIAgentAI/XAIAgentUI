import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Progress } from "@/components/ui/progress"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const trainingFormSchema = z.object({
  name: z.string().min(2, {
    message: "Agent name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  baseModel: z.string({
    required_error: "Please select a base model.",
  }),
  trainingData: z.string().min(1, {
    message: "Training data is required.",
  }),
})

type TrainingFormValues = z.infer<typeof trainingFormSchema>

const defaultValues: Partial<TrainingFormValues> = {
  name: "",
  description: "",
  trainingData: "",
}

export function Training() {
  const [isTraining, setIsTraining] = React.useState(false)
  const [progress, setProgress] = React.useState(0)

  const form = useForm<TrainingFormValues>({
    resolver: zodResolver(trainingFormSchema),
    defaultValues,
  })

  async function onSubmit(data: TrainingFormValues) {
    console.log('Submitting training data:', data);
    setIsTraining(true)
    // Simulate training progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTraining(false)
          return 100
        }
        return prev + 1
      })
    }, 100)
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Train Your AI Agent</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Custom Agent" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give your AI agent a unique and descriptive name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe what your agent does..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Explain the purpose and capabilities of your agent.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="baseModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Model</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a base model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                      <SelectItem value="llama-2">Llama 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the foundation model for your agent.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trainingData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Training Data</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".txt,.json,.csv"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        field.onChange(file ? file.name : "")
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload your training data (supported formats: .txt, .json, .csv)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isTraining}
            >
              {isTraining ? "Training in Progress..." : "Start Training"}
            </Button>
          </form>
        </Form>

        {isTraining && (
          <div className="mt-8 space-y-4">
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-neutral-600">
              Training Progress: {progress}%
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
