import { Settings } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from './ui/label';
import { Badge } from './ui/badge';

interface SettingsDialogProps {
  aiProvider: 'bedrock' | 'nvidia';
  onProviderChange: (provider: 'bedrock' | 'nvidia') => void;
}

export function SettingsDialog({ aiProvider, onProviderChange }: SettingsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <Settings className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your AI provider and preferences
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label>AI Provider</Label>
            <Select
              value={aiProvider}
              onValueChange={(value) => onProviderChange(value as 'bedrock' | 'nvidia')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bedrock">
                  <div className="flex items-center gap-2">
                    <span>AWS Bedrock</span>
                    <Badge variant="secondary" className="text-xs">Claude 3</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="nvidia">
                  <div className="flex items-center gap-2">
                    <span>NVIDIA NIM</span>
                    <Badge variant="secondary" className="text-xs">Nemotron Nano</Badge>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-slate-500">
              {aiProvider === 'bedrock' 
                ? 'Using AWS Bedrock with Claude 3 Sonnet for intelligent conversations'
                : 'Using NVIDIA NIM with Nemotron Nano + Retrieval Embeddings for RAG-powered inference'
              }
            </p>
          </div>

          <div className="border-t pt-4">
            <h4 className="mb-2">Provider Information</h4>
            {aiProvider === 'bedrock' ? (
              <div className="space-y-2 text-sm text-slate-600">
                <p>• Model: Claude 3 Sonnet</p>
                <p>• Features: Advanced reasoning, context retention</p>
                <p>• Requires: AWS credentials configured</p>
              </div>
            ) : (
              <div className="space-y-2 text-sm text-slate-600">
                <p>• Model: nvidia/llama-3_1-nemotron-nano-8b-v1</p>
                <p>• Embeddings: nvidia/nv-embedqa-e5-v5</p>
                <p>• Features: RAG-powered context retrieval, semantic search</p>
                <p>• System: "detailed thinking off" for concise responses</p>
                <p>• Requires: NVIDIA API key configured</p>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <h4 className="mb-2 text-sm">About NVIDIA NIM & RAG</h4>
            <div className="text-xs text-slate-500 space-y-2">
              <p>This agentic application uses:</p>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li><strong>Reasoning:</strong> Llama 3.1 Nemotron Nano 8B</li>
                <li><strong>Embeddings:</strong> NV-EmbedQA-E5-v5 (Retrieval NIM)</li>
                <li><strong>RAG:</strong> Semantic search for relevant context</li>
                <li><strong>GPU Acceleration:</strong> Optimized inference</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="mb-2 text-sm">Agentic Features</h4>
            <div className="text-xs text-slate-500 space-y-1">
              <p>When using NVIDIA NIM, the AI agent:</p>
              <ul className="list-disc list-inside pl-2 space-y-1">
                <li>Generates embeddings for all project ideas</li>
                <li>Retrieves semantically similar context</li>
                <li>Provides context-aware responses</li>
                <li>Remembers and connects related concepts</li>
              </ul>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
