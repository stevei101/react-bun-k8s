import { Sparkles, Cpu, Cloud, Zap, Brain } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-16 w-16 text-blue-600" />
            <h1 className="text-blue-900">The Product Mindset</h1>
          </div>
          <p className="text-xl text-slate-600 mb-2">
            AI-Powered Ideation & Design Companion
          </p>
          <p className="text-slate-500">
            Built for the AWS & NVIDIA Hackathon
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Cloud className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">AWS Bedrock</CardTitle>
              </div>
              <CardDescription>
                Powered by Claude 3 Sonnet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Advanced reasoning capabilities</li>
                <li>✓ Deep context understanding</li>
                <li>✓ Bedrock Guardrails ready</li>
                <li>✓ Enterprise-grade security</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">NVIDIA NIM</CardTitle>
              </div>
              <CardDescription>
                Nemotron Nano 8B + Retrieval Embeddings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>✓ Agentic reasoning model</li>
                <li>✓ RAG-powered context retrieval</li>
                <li>✓ Semantic search embeddings</li>
                <li>✓ NeMo compatible</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Brain className="h-6 w-6" />
              <CardTitle className="text-white">Agentic AI Architecture</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm">🧠 Reasoning Engine</p>
                  <p className="text-xs text-blue-100 mt-1">Nemotron Nano 8B</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm">🔍 Retrieval System</p>
                  <p className="text-xs text-blue-100 mt-1">Embedding NIM</p>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div>
                  <Zap className="h-6 w-6 mx-auto mb-1" />
                  <p>Ideate</p>
                </div>
                <div>
                  <Zap className="h-6 w-6 mx-auto mb-1" />
                  <p>Plan</p>
                </div>
                <div>
                  <Zap className="h-6 w-6 mx-auto mb-1" />
                  <p>Design</p>
                </div>
                <div>
                  <Zap className="h-6 w-6 mx-auto mb-1" />
                  <p>Execute</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            onClick={onGetStarted} 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
          >
            Get Started
          </Button>
          <p className="mt-4 text-sm text-slate-500">
            Switch between AI providers anytime in Settings
          </p>
        </div>
      </div>
    </div>
  );
}
