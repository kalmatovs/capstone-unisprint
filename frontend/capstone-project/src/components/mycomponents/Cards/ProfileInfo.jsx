import React, {useState, useEffect} from 'react'
import Navbar from '../Navbar/Navbar'
import axiosInstance from '../../../utils/axiosInstance';
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, GraduationCap, Mail } from 'lucide-react'

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token"); // Retrieve the token
            const response = await axiosInstance.get("/profile", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data.user); // Set the user data
        } catch (err) {
            setError("Error fetching profile. Please try again.");
        }
    };

    fetchProfile();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>Loading...</p>;
    }

  return (
    <>
    <Navbar />  
        <div className='flex justify-center mt-10'>
        <Card className="w-full max-w-md overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="border-b bg-muted/50 p-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="#" alt={user.name} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-black text-2xl font-bold">{user.fullName}</h2>
            <Badge className="">{user.year}</Badge>
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
          <a className="text-primary hover:underline">
          {user.email}
          </a>
        </div>
      </CardContent>
    </Card></div>
    </>
  )
}

export default ProfileInfo;