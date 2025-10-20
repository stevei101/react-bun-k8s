import { Plus, FolderOpen, Trash2, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  ideas: any[];
  conversations: any[];
  createdAt: string;
  updatedAt: string;
}

interface ProjectSidebarProps {
  projects: Project[];
  currentProject: Project | null;
  onSelectProject: (project: Project) => void;
  onNewProject: () => void;
  onDeleteProject: (id: string) => void;
}

export function ProjectSidebar({
  projects,
  currentProject,
  onSelectProject,
  onNewProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  return (
    <div className="w-64 border-r bg-slate-50 flex flex-col">
      <div className="p-4 border-b">
        <h2 className="mb-3">Projects</h2>
        <Button onClick={onNewProject} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {projects.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <FolderOpen className="mx-auto h-12 w-12 mb-2 opacity-50" />
              <p>No projects yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className={`group relative rounded-lg p-3 cursor-pointer transition-colors ${
                    currentProject?.id === project.id
                      ? 'bg-blue-100 border border-blue-300'
                      : 'hover:bg-slate-100'
                  }`}
                  onClick={() => onSelectProject(project)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <ChevronRight
                          className={`h-4 w-4 flex-shrink-0 transition-transform ${
                            currentProject?.id === project.id ? 'rotate-90' : ''
                          }`}
                        />
                        <h3 className="truncate">{project.title}</h3>
                      </div>
                      {project.description && (
                        <p className="text-slate-600 text-sm mt-1 line-clamp-2 ml-6">
                          {project.description}
                        </p>
                      )}
                      <div className="flex gap-3 mt-2 ml-6 text-xs text-slate-500">
                        <span>{project.ideas?.length || 0} ideas</span>
                        <span>{project.conversations?.length || 0} chats</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProjectToDelete(project.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      <AlertDialog open={!!projectToDelete} onOpenChange={() => setProjectToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project and all associated ideas and conversations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (projectToDelete) {
                  onDeleteProject(projectToDelete);
                  setProjectToDelete(null);
                }
              }}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
