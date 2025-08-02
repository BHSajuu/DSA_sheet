import { BookOpen, Target, Trophy, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardHeaderProps {
  totalProblems: number;
  completedProblems: number;
  categories: number;
}

export const DashboardHeader = ({ totalProblems, completedProblems, categories }: DashboardHeaderProps) => {
  const completionPercentage = totalProblems > 0 ? Math.round((completedProblems / totalProblems) * 100) : 0;
  
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            DSA Mastery Hub
          </h1>
          <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Track your Data Structures & Algorithms journey with interactive progress monitoring
          </p>
        </div>
        
        {/* Progress Ring */}
        <div className="flex justify-center mt-8">
          <div className="relative">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${completionPercentage * 2.51} 251`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out animate-progress"
              className="transition-all duration-1000 ease-out"
                  filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
          {/* FIXED: Added smooth transition for percentage display to prevent number jumping */}
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{completionPercentage}%</div>
              <div className="text-2xl font-bold text-primary transition-all duration-500">{completionPercentage}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 animate-slide-up border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Problems</p>
                <p className="text-2xl font-bold text-foreground">{totalProblems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 animate-slide-up border-border/50 bg-card/50 backdrop-blur-sm" style={{ animationDelay: '0.1s' }}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-success/10 text-success group-hover:bg-success/20 transition-colors">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">{completedProblems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 animate-slide-up border-border/50 bg-card/50 backdrop-blur-sm" style={{ animationDelay: '0.2s' }}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-warning/10 text-warning group-hover:bg-warning/20 transition-colors">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                <p className="text-2xl font-bold text-foreground">{totalProblems - completedProblems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 animate-slide-up border-border/50 bg-card/50 backdrop-blur-sm" style={{ animationDelay: '0.3s' }}>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-info/10 text-info group-hover:bg-info/20 transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold text-foreground">{categories}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};