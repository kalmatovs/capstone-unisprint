'use client'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import axiosInstance from '../../../utils/axiosInstance';
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, GraduationCap, Mail } from 'lucide-react'
import OrderCard from '../Cards/OrderCard'
import axios from 'axios';

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.newPost) {
      setPosts(prevPosts => [location.state.newPost, ...prevPosts]);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const [profileResponse, postsResponse, acceptedJobsResponse] = await Promise.all([
          axiosInstance.get("/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axiosInstance.get("/get-user-created-posts", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axiosInstance.get("/get-user-accepted-jobs", {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setUser(profileResponse.data.user);
        setPosts(postsResponse.data.createdPosts); // Updated to match the backend response
        setAcceptedJobs(acceptedJobsResponse.data.acceptedJobs);
        setIsLoading(false);
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.response?.data?.message || err.message || "Error fetching profile");
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <p>Loading profile...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen text-red-500">
          <p>{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className='flex flex-col items-center mt-10 space-y-6'>
        {user && (
          <Card className="w-full max-w-md overflow-hidden transition-all hover:shadow-lg">
            <CardHeader className="border-b bg-muted/50 p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user.profilePicture || "#"} alt={user.name} />
                  <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-black text-2xl font-bold">{user.fullName}</h2>
                  <Badge>{user.year}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 p-6">
              <div className="flex items-center space-x-2 text-sm">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span>{user.major}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user.hometown}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${user.email}`} className="text-primary hover:underline">
                  {user.email}
                </a>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="w-full max-w-md">
          <h3 className="text-2xl font-bold mb-4">My Posts</h3>
          {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            posts.map((post) => (
              <OrderCard
                key={post._id}
                title={post.title}
                date={post.datePosted}
                content={post.content}
                category={post.category}
                location={post.location}
                price={post.price}
                urgency={post.urgency}
              />
            ))
          )}
        </div>
        <div className="w-full max-w-md">
          <h3 className="text-2xl font-bold mb-4">My Accepted Jobs</h3>
          {acceptedJobs.length === 0 ? (
            <p>No accepted jobs yet.</p>
          ) : (
            acceptedJobs.map((job) => (
              <OrderCard
                key={job._id}
                title={job.title}
                date={job.datePosted}
                content={job.content}
                category={job.category}
                location={job.location}
                price={job.payment}
                urgency={job.urgency}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default ProfileInfo

