import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, Shield, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DashboardContainer } from "@/components/dashboard/dashboard-app";

const teamMembers = [
  {
    name: "John Doe",
    email: "john@company.com",
    role: "Admin",
    status: "Active",
    expenses: 45
  },
  {
    name: "Jane Smith", 
    email: "jane@company.com",
    role: "Member",
    status: "Active",
    expenses: 32
  },
  {
    name: "Mike Johnson",
    email: "mike@company.com", 
    role: "Member",
    status: "Pending",
    expenses: 0
  }
];

const bgImage = "/13.jpg";

export default function TeamPage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: `url(${bgImage})`, opacity: 0.18 }}
      />
      <div className="relative z-10">
        <DashboardContainer>
          <div className="space-y-8 p-4 sm:p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
                <p className="text-muted-foreground">Manage your team members and their permissions</p>
              </div>
              <Button className="button-glow">
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Members</CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">3</div>
                  <p className="text-xs text-muted-foreground">Active team members</p>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-green-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '100ms'}}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Activity className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">2</div>
                  <p className="text-xs text-muted-foreground">Currently active</p>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-amber-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '200ms'}}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <UserPlus className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-500">1</div>
                  <p className="text-xs text-muted-foreground">Pending invitations</p>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-blue-500/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '300ms'}}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Admins</CardTitle>
                  <Shield className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">1</div>
                  <p className="text-xs text-muted-foreground">Admin users</p>
                </CardContent>
              </Card>
            </div>

            <Card className="glassmorphism border-primary/20 animate-in fade-in-0 slide-in-from-bottom-4 duration-500" style={{animationDelay: '400ms'}}>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage your team members and their access levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-primary/10 rounded-lg hover:bg-primary/5 transition-colors animate-in fade-in-0" style={{animationDelay: `${index * 100}ms`}}>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{member.expenses} expenses</div>
                          <Badge 
                            variant={member.status === 'Active' ? 'default' : 'outline'}
                            className={member.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                          >
                            {member.status}
                          </Badge>
                        </div>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {member.role}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </DashboardContainer>
      </div>
    </div>
  );
}
