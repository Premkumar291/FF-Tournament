import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../API/Auth/auth.api';

export default function DashboardPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.success) {
        console.log("Logout successful");
        navigate("/login");
      } else {
        console.error("Logout failed:", response.data.message);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/10 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md hover:opacity-90 transition-opacity"
          >
            Logout
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Tournaments</h2>
            <p className="text-muted-foreground">View and join upcoming tournaments</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Profile</h2>
            <p className="text-muted-foreground">Manage your player profile</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
            <p className="text-muted-foreground">Check your ranking and stats</p>
          </div>
        </div>
      </div>
    </div>
  );
}