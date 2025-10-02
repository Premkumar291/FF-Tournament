import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../Ui/button"
import {
  Menu,
  Settings,
  Share2,
  MoreVertical,
  Calendar,
  Users,
  Trophy,
  User,
  Edit2,
  Save,
  X,
  Target,
  Award,
  Zap,
  TrendingUp,
  Crown,
  Flame,
  Star,
} from "lucide-react"
import { getUser } from "../../API/Auth/auth.api"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState({
    username: "ProGamer_2024",
    email: "progamer@example.com",
    freeFireUID: "1234567890",
    teamName: "Rogue Legion",
    rank: "Diamond II",
    region: "Asia Pacific",
  })
  const [editedProfile, setEditedProfile] = useState({ ...profileData })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser()
        if (response.success) {
          setProfileData({
            username: response.data.userName || "ProGamer_2024",
            email: response.data.email || "progamer@example.com",
            freeFireUID: response.data.freeFireUID || "1234567890",
            teamName: response.data.teamName || "Rogue Legion",
            rank: response.data.rank || "Diamond II",
            region: response.data.region || "Asia Pacific",
          })
        } else {
          setError(response.data.message || "Failed to fetch user data")
        }
      } catch (err) {
        setError("Failed to fetch user data")
        console.error("Error fetching user data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleSaveProfile = async () => {
    try {
      // In a real app, you would make an API call to update the profile
      // For now, we'll just update the local state
      setProfileData({ ...editedProfile })
      setIsEditingProfile(false)
      
      // Show success message
      alert("Profile updated successfully!")
    } catch (err) {
      setError("Failed to update profile")
      console.error("Error updating profile:", err)
    }
  }

  const handleCancelEdit = () => {
    setEditedProfile({ ...profileData })
    setIsEditingProfile(false)
  }

  const handleLogout = async () => {
    try {
      // In a real app, you would make an API call to logout
      // For now, we'll just redirect to login page
      navigate("/login")
    } catch (err) {
      setError("Failed to logout")
      console.error("Error during logout:", err)
    }
  }

  // Function to register for a tournament
  const handleTournamentRegistration = async (tournamentId) => {
    try {
      // In a real app, you would make an API call to register for the tournament
      console.log(`Registering for tournament ${tournamentId}`)
      alert(`Successfully registered for tournament!`)
      
      // Refresh dashboard data after registration
      fetchDashboardData()
    } catch (err) {
      setError("Failed to register for tournament")
      console.error("Error registering for tournament:", err)
    }
  }

  // Function to fetch all dashboard data
  const fetchDashboardData = async () => {
    try {
      // In a real app, you would make multiple API calls to fetch all dashboard data
      console.log("Fetching dashboard data...")
      
      // For example, fetch updated user data
      const userResponse = await getUser()
      if (userResponse.success) {
        setProfileData({
          username: userResponse.data.userName || profileData.username,
          email: userResponse.data.email || profileData.email,
          freeFireUID: userResponse.data.freeFireUID || profileData.freeFireUID,
          teamName: userResponse.data.teamName || profileData.teamName,
          rank: userResponse.data.rank || profileData.rank,
          region: userResponse.data.region || profileData.region,
        })
      }
    } catch (err) {
      setError("Failed to refresh dashboard data")
      console.error("Error fetching dashboard data:", err)
    }
  }

  const tournaments = [
    {
      id: 1,
      name: "Free Fire Night: Elite Cup",
      date: "Oct 20, 7:00 PM",
      slots: "32 slots",
      mode: "Squad",
      prize: "$1,000",
      status: "Open",
    },
    {
      id: 2,
      name: "FF Pro Clash",
      date: "Oct 27, 8:30 PM",
      slots: "48 slots",
      mode: "Squad",
      prize: "$2,500",
      status: "Open",
    },
    {
      id: 3,
      name: "Rapid Solo Rumble",
      date: "Nov 02, 5:00 PM",
      slots: "64 slots",
      mode: "Solo",
      prize: "$500",
      status: "Filling Fast",
    },
  ]

  const recentMatches = [
    { id: 1, tournament: "Elite Cup Qualifier", placement: "2nd", kills: 12, date: "Oct 15" },
    { id: 2, tournament: "Weekend Warriors", placement: "1st", kills: 18, date: "Oct 12" },
    { id: 3, tournament: "Solo Showdown", placement: "5th", kills: 8, date: "Oct 08" },
  ]

  const leaderboard = [
    { rank: 1, name: "Rogue Legion", points: 78 },
    { rank: 2, name: "Phoenix Blaze", points: 72 },
    { rank: 3, name: "Night Howlers", points: 66 },
    { rank: 4, name: "Iron Reign", points: 60 },
    { rank: 5, name: "Crimson Vipers", points: 58 },
  ]

  // Show loading state
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "white", fontSize: "18px" }}>Loading dashboard...</div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ 
          background: "rgba(255,255,255,0.95)", 
          padding: "24px", 
          borderRadius: "16px", 
          textAlign: "center",
          maxWidth: "400px"
        }}>
          <div style={{ color: "#f44336", fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Error</div>
          <div style={{ color: "#333", marginBottom: "24px" }}>{error}</div>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: "linear-gradient(135deg, #d32f2f 0%, #ff5722 100%)",
              color: "white",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      {/* Header */}
      <header
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          color: "white",
          padding: "16px",
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              style={{
                background: "linear-gradient(135deg, #d32f2f 0%, #ff5722 100%)",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <div style={{ fontSize: "16px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
                <Flame style={{ width: "20px", height: "20px", color: "#ff5722" }} />
                FireArena
              </div>
              <div style={{ fontSize: "12px", color: "#999" }}>Tournament Platform</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <button
              onClick={handleLogout}
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <span style={{ fontSize: "12px", fontWeight: "600" }}>Logout</span>
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "8px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div
        style={{
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(10px)",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Trophy className="w-5 h-5" style={{ color: "#d32f2f" }} />
          <span style={{ fontSize: "16px", fontWeight: "700", color: "#1a1a1a" }}>Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              background:
                activeTab === "overview" ? "linear-gradient(135deg, #d32f2f 0%, #ff5722 100%)" : "transparent",
              border: "none",
              fontSize: "13px",
              fontWeight: "600",
              color: activeTab === "overview" ? "white" : "#666",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "all 0.3s",
              boxShadow: activeTab === "overview" ? "0 4px 12px rgba(211,47,47,0.3)" : "none",
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("tournaments")}
            style={{
              background:
                activeTab === "tournaments" ? "linear-gradient(135deg, #d32f2f 0%, #ff5722 100%)" : "transparent",
              border: "none",
              fontSize: "13px",
              fontWeight: "600",
              color: activeTab === "tournaments" ? "white" : "#666",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "all 0.3s",
              boxShadow: activeTab === "tournaments" ? "0 4px 12px rgba(211,47,47,0.3)" : "none",
            }}
          >
            Tournaments
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            style={{
              background: activeTab === "profile" ? "linear-gradient(135deg, #d32f2f 0%, #ff5722 100%)" : "transparent",
              border: "none",
              fontSize: "13px",
              fontWeight: "600",
              color: activeTab === "profile" ? "white" : "#666",
              cursor: "pointer",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "all 0.3s",
              boxShadow: activeTab === "profile" ? "0 4px 12px rgba(211,47,47,0.3)" : "none",
            }}
          >
            Profile
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main style={{ padding: "24px 16px", maxWidth: "600px", margin: "0 auto" }}>
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Hero Section */}
            <section
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "28px",
                marginBottom: "24px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: "800",
                    background: "linear-gradient(135deg, #d32f2f 0%, #ff5722 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    lineHeight: "1.2",
                  }}
                >
                  Clash. Conquer. Claim the Crown.
                </h1>
                <button
                  onClick={fetchDashboardData}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "#333",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                >
                  Refresh
                </button>
              </div>
              <p
                style={{
                  fontSize: "14px",
                  color: "#555",
                  lineHeight: "1.7",
                  marginBottom: "24px",
                }}
              >
                Enter competitive Free Fire tournaments with smooth registration, live score tracking, and fair play.
                Prove your squad and rise up the leaderboard.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Button
                  style={{
                    background: "linear-gradient(135deg, #d32f2f 0%, #ff5722 100%)",
                    color: "white",
                    padding: "14px 28px",
                    fontSize: "14px",
                    fontWeight: "700",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(211,47,47,0.4)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(211,47,47,0.5)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(211,47,47,0.4)"
                  }}
                >
                  Register Your Team
                </Button>
                <Button
                  style={{
                    background: "linear-gradient(135deg, #ff9800 0%, #ff5722 100%)",
                    color: "white",
                    padding: "14px 28px",
                    fontSize: "14px",
                    fontWeight: "700",
                    border: "none",
                    borderRadius: "12px",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(255,152,0,0.4)",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)"
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(255,152,0,0.5)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 6px 20px rgba(255,152,0,0.4)"
                  }}
                >
                  Browse Events
                </Button>
              </div>
            </section>

            {/* Stats Cards */}
            <section style={{ marginBottom: "32px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                <div
                  style={{
                    background: "linear-gradient(135deg, #d32f2f 0%, #ff5722 100%)",
                    borderRadius: "16px",
                    padding: "20px",
                    boxShadow: "0 8px 24px rgba(211,47,47,0.3)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(211,47,47,0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(211,47,47,0.3)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <Trophy style={{ width: "24px", height: "24px", color: "white" }} />
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)", fontWeight: "600" }}>
                      Tournaments
                    </span>
                  </div>
                  <div style={{ fontSize: "32px", fontWeight: "800", color: "white" }}>12</div>
                  <div
                    style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", fontWeight: "600", marginTop: "6px" }}
                  >
                    +3 this month
                  </div>
                </div>

                <div
                  style={{
                    background: "linear-gradient(135deg, #ff9800 0%, #ff5722 100%)",
                    borderRadius: "16px",
                    padding: "20px",
                    boxShadow: "0 8px 24px rgba(255,152,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(255,152,0,0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(255,152,0,0.3)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <Award style={{ width: "24px", height: "24px", color: "white" }} />
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)", fontWeight: "600" }}>Wins</span>
                  </div>
                  <div style={{ fontSize: "32px", fontWeight: "800", color: "white" }}>5</div>
                  <div
                    style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", fontWeight: "600", marginTop: "6px" }}
                  >
                    41.7% win rate
                  </div>
                </div>

                <div
                  style={{
                    background: "linear-gradient(135deg, #2196f3 0%, #00bcd4 100%)",
                    borderRadius: "16px",
                    padding: "20px",
                    boxShadow: "0 8px 24px rgba(33,150,243,0.3)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(33,150,243,0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(33,150,243,0.3)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <Target style={{ width: "24px", height: "24px", color: "white" }} />
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)", fontWeight: "600" }}>
                      Total Kills
                    </span>
                  </div>
                  <div style={{ fontSize: "32px", fontWeight: "800", color: "white" }}>156</div>
                  <div
                    style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", fontWeight: "600", marginTop: "6px" }}
                  >
                    13 avg/match
                  </div>
                </div>

                <div
                  style={{
                    background: "linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)",
                    borderRadius: "16px",
                    padding: "20px",
                    boxShadow: "0 8px 24px rgba(156,39,176,0.3)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    transition: "all 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "0 12px 32px rgba(156,39,176,0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(156,39,176,0.3)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <TrendingUp style={{ width: "24px", height: "24px", color: "white" }} />
                    <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.9)", fontWeight: "600" }}>Rank</span>
                  </div>
                  <div style={{ fontSize: "32px", fontWeight: "800", color: "white" }}>#24</div>
                  <div
                    style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)", fontWeight: "600", marginTop: "6px" }}
                  >
                    ↑ 8 positions
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Matches */}
            <section style={{ marginBottom: "32px" }}>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "white",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Star style={{ width: "24px", height: "24px", color: "#ffd700" }} />
                Recent Matches
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {recentMatches.map((match) => (
                  <div
                    key={match.id}
                    style={{
                      background: "rgba(255,255,255,0.95)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "16px",
                      padding: "20px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "all 0.3s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateX(4px)"
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateX(0)"
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: "700", color: "#1a1a1a", marginBottom: "6px" }}>
                        {match.tournament}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666" }}>{match.date}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "800",
                          background:
                            match.placement === "1st"
                              ? "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)"
                              : "linear-gradient(135deg, #ff9800 0%, #ff5722 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          marginBottom: "4px",
                        }}
                      >
                        {match.placement}
                      </div>
                      <div style={{ fontSize: "12px", color: "#666", fontWeight: "600" }}>{match.kills} kills</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Leaderboard Preview */}
            <section>
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "white",
                  marginBottom: "12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Crown style={{ width: "24px", height: "24px", color: "#ffd700" }} />
                Leaderboard Preview
              </h2>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "rgba(255,255,255,0.8)",
                  marginBottom: "16px",
                }}
              >
                Top Teams
              </div>

              <div
                style={{
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "16px",
                  padding: "20px",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                {leaderboard.map((team, index) => (
                  <div
                    key={team.rank}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 0",
                      borderBottom: team.rank !== 5 ? "1px solid rgba(0,0,0,0.05)" : "none",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          background:
                            index === 0
                              ? "linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)"
                              : index === 1
                                ? "linear-gradient(135deg, #c0c0c0 0%, #e8e8e8 100%)"
                                : index === 2
                                  ? "linear-gradient(135deg, #cd7f32 0%, #e8a87c 100%)"
                                  : "linear-gradient(135deg, #ff9800 0%, #ff5722 100%)",
                          color: index < 3 ? "#1a1a1a" : "white",
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "14px",
                          fontWeight: "800",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        }}
                      >
                        {team.rank}
                      </div>
                      <span style={{ fontSize: "15px", color: "#1a1a1a", fontWeight: "600" }}>{team.name}</span>
                    </div>
                    <span
                      style={{
                        fontSize: "16px",
                        color: "#1a1a1a",
                        fontWeight: "700",
                        background: "linear-gradient(135deg, #d32f2f 0%, #ff5722 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {team.points} pts
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* Tournaments Tab */}
        {activeTab === "tournaments" && (
          <section>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ fontSize: "24px", fontWeight: "700", color: "white" }}>Upcoming Tournaments</h2>
              <button
                style={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  padding: "8px 16px",
                  borderRadius: "8px",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
              >
                View all →
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {tournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  style={{
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    padding: "24px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    position: "relative",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.2)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.15)"
                  }}
                >
                  {tournament.status === "Filling Fast" && (
                    <div
                      style={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        background: "linear-gradient(135deg, #ff5722 0%, #ff9800 100%)",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "8px",
                        fontSize: "11px",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        boxShadow: "0 4px 12px rgba(255,87,34,0.4)",
                      }}
                    >
                      <Zap style={{ width: "14px", height: "14px" }} />
                      {tournament.status}
                    </div>
                  )}
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "#1a1a1a",
                      marginBottom: "16px",
                    }}
                  >
                    {tournament.name}
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        color: "#555",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      <Calendar className="w-5 h-5" style={{ color: "#d32f2f" }} />
                      <span>{tournament.date}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        color: "#555",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      <Users className="w-5 h-5" style={{ color: "#ff9800" }} />
                      <span>
                        {tournament.slots} • {tournament.mode}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        color: "#555",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      <Trophy className="w-5 h-5" style={{ color: "#4caf50" }} />
                      <span>Prize: {tournament.prize}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleTournamentRegistration(tournament.id)}
                    style={{
                      background: "linear-gradient(135deg, #d32f2f 0%, #ff5722 100%)",
                      color: "white",
                      width: "100%",
                      padding: "14px",
                      fontSize: "15px",
                      fontWeight: "700",
                      border: "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      boxShadow: "0 6px 20px rgba(211,47,47,0.4)",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)"
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(211,47,47,0.5)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(211,47,47,0.4)"
                    }}
                  >
                    Register
                  </Button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <section>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <h2 style={{ fontSize: "24px", fontWeight: "700", color: "white" }}>My Profile</h2>
              {!isEditingProfile ? (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
                >
                  <Edit2 style={{ width: "16px", height: "16px" }} />
                  Edit Profile
                </button>
              ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={handleSaveProfile}
                    style={{
                      background: "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
                      border: "none",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      boxShadow: "0 4px 16px rgba(76,175,80,0.4)",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)"
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(76,175,80,0.5)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(76,175,80,0.4)"
                    }}
                  >
                    <Save style={{ width: "16px", height: "16px" }} />
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    style={{
                      background: "linear-gradient(135deg, #f44336 0%, #e91e63 100%)",
                      border: "none",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "10px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      boxShadow: "0 4px 16px rgba(244,67,54,0.4)",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)"
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(244,67,54,0.5)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(244,67,54,0.4)"
                    }}
                  >
                    <X style={{ width: "16px", height: "16px" }} />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div
              style={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "32px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #d32f2f 0%, #ff5722 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                  boxShadow: "0 8px 24px rgba(211,47,47,0.4)",
                }}
              >
                <User style={{ width: "50px", height: "50px", color: "white" }} />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#1a1a1a", marginBottom: "6px" }}>
                {profileData.username}
              </div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  background: "linear-gradient(135deg, #d32f2f 0%, #ff5722 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {profileData.rank}
              </div>
            </div>

            {/* Profile Details */}
            <div
              style={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "20px",
                padding: "24px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1a1a1a", marginBottom: "20px" }}>
                Account Details
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {/* Username */}
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      fontWeight: "600",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Username
                  </label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={editedProfile.username}
                      onChange={(e) => setEditedProfile({ ...editedProfile, username: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e0e0e0",
                        borderRadius: "10px",
                        fontSize: "14px",
                        color: "#1a1a1a",
                        fontWeight: "500",
                        transition: "all 0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#d32f2f")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
                    />
                  ) : (
                    <div style={{ fontSize: "15px", color: "#1a1a1a", fontWeight: "600" }}>{profileData.username}</div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      fontWeight: "600",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Email
                  </label>
                  {isEditingProfile ? (
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e0e0e0",
                        borderRadius: "10px",
                        fontSize: "14px",
                        color: "#1a1a1a",
                        fontWeight: "500",
                        transition: "all 0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#d32f2f")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
                    />
                  ) : (
                    <div style={{ fontSize: "15px", color: "#1a1a1a", fontWeight: "600" }}>{profileData.email}</div>
                  )}
                </div>

                {/* FreeFire UID */}
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      fontWeight: "600",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    FreeFire UID
                  </label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={editedProfile.freeFireUID}
                      onChange={(e) => setEditedProfile({ ...editedProfile, freeFireUID: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e0e0e0",
                        borderRadius: "10px",
                        fontSize: "14px",
                        color: "#1a1a1a",
                        fontWeight: "500",
                        transition: "all 0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#d32f2f")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
                    />
                  ) : (
                    <div style={{ fontSize: "15px", color: "#1a1a1a", fontWeight: "600" }}>
                      {profileData.freeFireUID}
                    </div>
                  )}
                </div>

                {/* Team Name */}
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      fontWeight: "600",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Team Name
                  </label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={editedProfile.teamName}
                      onChange={(e) => setEditedProfile({ ...editedProfile, teamName: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e0e0e0",
                        borderRadius: "10px",
                        fontSize: "14px",
                        color: "#1a1a1a",
                        fontWeight: "500",
                        transition: "all 0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#d32f2f")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
                    />
                  ) : (
                    <div style={{ fontSize: "15px", color: "#1a1a1a", fontWeight: "600" }}>{profileData.teamName}</div>
                  )}
                </div>

                {/* Rank */}
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      fontWeight: "600",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Current Rank
                  </label>
                  {isEditingProfile ? (
                    <select
                      value={editedProfile.rank}
                      onChange={(e) => setEditedProfile({ ...editedProfile, rank: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e0e0e0",
                        borderRadius: "10px",
                        fontSize: "14px",
                        color: "#1a1a1a",
                        fontWeight: "500",
                        transition: "all 0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#d32f2f")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
                    >
                      <option>Bronze</option>
                      <option>Silver</option>
                      <option>Gold</option>
                      <option>Platinum</option>
                      <option>Diamond I</option>
                      <option>Diamond II</option>
                      <option>Diamond III</option>
                      <option>Heroic</option>
                      <option>Grandmaster</option>
                    </select>
                  ) : (
                    <div style={{ fontSize: "15px", color: "#1a1a1a", fontWeight: "600" }}>{profileData.rank}</div>
                  )}
                </div>

                {/* Region */}
                <div>
                  <label
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      fontWeight: "600",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Region
                  </label>
                  {isEditingProfile ? (
                    <select
                      value={editedProfile.region}
                      onChange={(e) => setEditedProfile({ ...editedProfile, region: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "2px solid #e0e0e0",
                        borderRadius: "10px",
                        fontSize: "14px",
                        color: "#1a1a1a",
                        fontWeight: "500",
                        transition: "all 0.3s",
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "#d32f2f")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
                    >
                      <option>Asia Pacific</option>
                      <option>North America</option>
                      <option>Europe</option>
                      <option>South America</option>
                      <option>Middle East</option>
                      <option>Africa</option>
                    </select>
                  ) : (
                    <div style={{ fontSize: "15px", color: "#1a1a1a", fontWeight: "600" }}>{profileData.region}</div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            padding: "32px 0 16px",
            color: "rgba(255,255,255,0.7)",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          © 2025 FireArena. All rights reserved
        </footer>
      </main>
    </div>
  )
}
