import { useState } from 'react';
import { Plus, Lightbulb, Target, GitBranch, CheckCircle2, Database } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RAGStatusPanel } from './RAGStatusPanel';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

interface Idea {
  id: string;
  type: 'idea' | 'goal' | 'task' | 'feature';
  title: string;
  description: string;
  status: 'brainstorm' | 'planning' | 'in-progress' | 'completed';
  createdAt: string;
}

interface IdeationCanvasProps {
  projectId: string | null;
  ideas: Idea[];
  onAddIdea: (idea: Omit<Idea, 'id' | 'createdAt'>) => void;
  onUpdateIdea: (id: string, updates: Partial<Idea>) => void;
}

const ideaTypeIcons = {
  idea: Lightbulb,
  goal: Target,
  feature: GitBranch,
  task: CheckCircle2,
};

const ideaTypeColors = {
  idea: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  goal: 'bg-blue-100 text-blue-700 border-blue-300',
  feature: 'bg-purple-100 text-purple-700 border-purple-300',
  task: 'bg-green-100 text-green-700 border-green-300',
};

export function IdeationCanvas({ projectId, ideas, onAddIdea, onUpdateIdea }: IdeationCanvasProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showRAGPanel, setShowRAGPanel] = useState(false);
  const [newIdea, setNewIdea] = useState({
    type: 'idea' as Idea['type'],
    title: '',
    description: '',
    status: 'brainstorm' as Idea['status'],
  });

  const handleAddIdea = () => {
    if (!newIdea.title.trim()) return;

    onAddIdea(newIdea);
    setNewIdea({
      type: 'idea',
      title: '',
      description: '',
      status: 'brainstorm',
    });
    setIsDialogOpen(false);
  };

  const groupedIdeas = ideas.reduce((acc, idea) => {
    if (!acc[idea.status]) {
      acc[idea.status] = [];
    }
    acc[idea.status].push(idea);
    return acc;
  }, {} as Record<string, Idea[]>);

  const statusColumns = [
    { key: 'brainstorm', label: 'Brainstorm', color: 'border-slate-300' },
    { key: 'planning', label: 'Planning', color: 'border-blue-300' },
    { key: 'in-progress', label: 'In Progress', color: 'border-orange-300' },
    { key: 'completed', label: 'Completed', color: 'border-green-300' },
  ];

  if (!projectId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Lightbulb className="mx-auto h-24 w-24 text-slate-300 mb-4" />
          <h3 className="text-slate-600 mb-2">No Project Selected</h3>
          <p className="text-slate-500">Create or select a project to start ideating</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h2>Ideation Canvas</h2>
            <p className="text-slate-600">Organize your thoughts and turn ideas into reality</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowRAGPanel(!showRAGPanel)}
            >
              <Database className="mr-2 h-4 w-4" />
              {showRAGPanel ? 'Hide' : 'Show'} RAG Status
            </Button>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Idea
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Collapsible open={showRAGPanel}>
          <CollapsibleContent>
            <RAGStatusPanel projectId={projectId} isVisible={showRAGPanel} />
          </CollapsibleContent>
        </Collapsible>

        <div className="p-6">
          <div className="grid grid-cols-4 gap-4 h-full">
          {statusColumns.map((column) => (
            <div key={column.key} className="flex flex-col">
              <div className={`border-b-4 ${column.color} pb-2 mb-4`}>
                <h3>{column.label}</h3>
                <p className="text-sm text-slate-500">
                  {groupedIdeas[column.key]?.length || 0} items
                </p>
              </div>
              <div className="space-y-3 flex-1">
                {groupedIdeas[column.key]?.map((idea) => {
                  const Icon = ideaTypeIcons[idea.type];
                  return (
                    <Card key={idea.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-2 mb-2">
                          <Badge variant="outline" className={ideaTypeColors[idea.type]}>
                            <Icon className="h-3 w-3 mr-1" />
                            {idea.type}
                          </Badge>
                        </div>
                        <CardTitle className="text-base">{idea.title}</CardTitle>
                      </CardHeader>
                      {idea.description && (
                        <CardContent>
                          <CardDescription className="text-sm line-clamp-3">
                            {idea.description}
                          </CardDescription>
                        </CardContent>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Idea</DialogTitle>
            <DialogDescription>
              Capture your thoughts, goals, features, or tasks
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm">Type</label>
              <Select
                value={newIdea.type}
                onValueChange={(value) =>
                  setNewIdea({ ...newIdea, type: value as Idea['type'] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">💡 Idea</SelectItem>
                  <SelectItem value="goal">🎯 Goal</SelectItem>
                  <SelectItem value="feature">🔀 Feature</SelectItem>
                  <SelectItem value="task">✅ Task</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm">Title</label>
              <Input
                value={newIdea.title}
                onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                placeholder="Enter a descriptive title..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Description</label>
              <Textarea
                value={newIdea.description}
                onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                placeholder="Add more details..."
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm">Status</label>
              <Select
                value={newIdea.status}
                onValueChange={(value) =>
                  setNewIdea({ ...newIdea, status: value as Idea['status'] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="brainstorm">Brainstorm</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddIdea} disabled={!newIdea.title.trim()}>
              Add Idea
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
