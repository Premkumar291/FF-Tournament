import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../UI/button"
import { Input } from "../../UI/input"
import { Label } from "../../UI/label"
import { Eye, EyeOff, Flame, ArrowLeft } from "lucide-react"
import { login } from "../../../API/Auth/auth.api"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Send userName instead of email to match backend expectations
      const response = await login({ userName: email, password })
      
      if (response.success) {
        console.log("Login successful:", response.data)
        // Redirect to dashboard or home page
        navigate("/dashboard")
      } else {
        // Handle error from API response
        const errorMessage = response.data?.message || response.error || "Login failed"
        setError(errorMessage)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </div>

      {/* Back button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Home</span>
      </Link>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gradient-to-br from-blue-900/40 via-indigo-900/40 to-purple-900/40 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-8 shadow-2xl shadow-blue-500/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-lg shadow-blue-500/50">
              <Flame className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-blue-200">Login to continue your gaming journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-100 font-medium">
                Username
              </Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-blue-950/50 border-blue-400/30 text-white placeholder:text-blue-300/50 focus:border-cyan-400 focus:ring-cyan-400/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-100 font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-blue-950/50 border-blue-400/30 text-white placeholder:text-blue-300/50 focus:border-cyan-400 focus:ring-cyan-400/50 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-cyan-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-blue-200 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-blue-400/30 bg-blue-950/50 text-cyan-500 focus:ring-cyan-400/50"
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-cyan-300 hover:text-cyan-200 transition-colors font-medium">
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 hover:from-blue-600 hover:via-cyan-600 hover:to-purple-600 text-white border-0 shadow-lg shadow-blue-500/50 transition-all hover:scale-[1.02] hover:shadow-cyan-500/50 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login to Arena"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-blue-400/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-blue-300">OR</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-blue-950/50 border-blue-400/30 text-blue-100 hover:bg-blue-900/50 hover:border-cyan-400/50 transition-all"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-blue-200 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-cyan-300 hover:text-cyan-200 font-semibold transition-colors">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
