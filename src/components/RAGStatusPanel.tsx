import { useState, useEffect } from 'react';
import { Database, Sparkles, Check, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface EmbeddingStatus {
  ideaId: string;
  ideaTitle: string;
  hasEmbedding: boolean;
  embeddingDimension: number;
}

interface RAGStatusPanelProps {
  projectId: string | null;
  isVisible: boolean;
}

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-583f6cb2`;

export function RAGStatusPanel({ projectId: currentProjectId, isVisible }: RAGStatusPanelProps) {
  const [embeddingsData, setEmbeddingsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isVisible && currentProjectId) {
      fetchEmbeddingsStatus();
    }
  }, [currentProjectId, isVisible]);

  const fetchEmbeddingsStatus = async () => {
    if (!currentProjectId) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE}/projects/${currentProjectId}/embeddings`, {
        headers: {
          Authorization: `Bearer ${publicAnonKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEmbeddingsData(data);
      }
    } catch (error) {
      console.error('Error fetching embeddings status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible || !currentProjectId) {
    return null;
  }

  return (
    <Card className="m-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-green-600" />
            <CardTitle className="text-lg">RAG System Status</CardTitle>
          </div>
          <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-300">
            <Sparkles className="h-3 w-3 mr-1" />
            NVIDIA Embeddings
          </Badge>
        </div>
        <CardDescription>
          Retrieval-Augmented Generation powered by nvidia/nv-embedqa-e5-v5
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-slate-500">
            <Clock className="h-8 w-8 animate-spin mx-auto mb-2" />
            <p className="text-sm">Loading embeddings status...</p>
          </div>
        ) : embeddingsData ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-50 rounded-lg p-3">
                <p className="text-sm text-slate-600">Total Ideas</p>
                <p className="text-2xl mt-1">{embeddingsData.totalIdeas}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-sm text-green-700">Embedded</p>
                <p className="text-2xl mt-1 text-green-600">{embeddingsData.embeddingsGenerated}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-700">Dimensions</p>
                <p className="text-2xl mt-1 text-blue-600">
                  {embeddingsData.embeddings.find((e: EmbeddingStatus) => e.hasEmbedding)?.embeddingDimension || 0}
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="text-sm mb-3">Embedded Ideas</h4>
              <ScrollArea className="h-48">
                <div className="space-y-2">
                  {embeddingsData.embeddings.map((embedding: EmbeddingStatus) => (
                    <div
                      key={embedding.ideaId}
                      className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {embedding.hasEmbedding ? (
                          <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <Clock className="h-4 w-4 text-slate-400 flex-shrink-0" />
                        )}
                        <span className="text-sm truncate">{embedding.ideaTitle}</span>
                      </div>
                      {embedding.hasEmbedding && (
                        <Badge variant="outline" className="text-xs ml-2">
                          Vector
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <div className="border-t pt-4">
              <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                <p className="text-xs text-blue-800">
                  <strong>How RAG Works:</strong> When you ask a question, the system generates an embedding
                  of your query, compares it with stored idea embeddings using cosine similarity, and retrieves
                  the most relevant context to enhance AI responses.
                </p>
                <div className="text-xs text-blue-700 pt-2 border-t border-blue-200">
                  <p><strong>Models Used:</strong></p>
                  <p>• Reasoning: nvidia/llama-3_1-nemotron-nano-8b-v1</p>
                  <p>• Embeddings: {embeddingsData.model}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <Database className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">No embeddings data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
