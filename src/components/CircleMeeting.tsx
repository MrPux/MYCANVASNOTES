import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, VideoOff, Mic, MicOff, MonitorUp, PhoneOff, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DailyIframe from "@daily-co/daily-js";
import { useToast } from "@/hooks/use-toast";

interface CircleMeetingProps {
  open: boolean;
  onClose: () => void;
  roomId: string;
  onMeetingStart?: () => void;
  onMeetingEnd?: () => void;
}

const CircleMeeting: React.FC<CircleMeetingProps> = ({ open, onClose, roomId, onMeetingStart, onMeetingEnd }) => {
  const { toast } = useToast();
  const [callFrame, setCallFrame] = useState<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [participants, setParticipants] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !containerRef.current) return;

    // Create a Daily meeting room
    const roomName = `study-room-${roomId}`;
    const frame = DailyIframe.createFrame(containerRef.current, {
      showLeaveButton: false,
      showFullscreenButton: false,
      iframeStyle: {
        position: 'relative',
        width: '100%',
        height: '100%',
        border: '0',
        borderRadius: '8px',
      },
    });

    // For demo purposes, using Daily's demo domain
    // In production, you'd create rooms via Daily API
    frame.join({ 
      url: `https://lovable.daily.co/${roomName}`,
      userName: `Student-${Math.floor(Math.random() * 1000)}`
    }).catch((error: Error) => {
      console.error('Error joining call:', error);
      toast({
        title: "Error",
        description: "Failed to join call. Make sure to allow camera and microphone access.",
        variant: "destructive",
      });
    });

    frame.on('participant-joined', () => {
      setParticipants(prev => prev + 1);
    });

    frame.on('participant-left', () => {
      setParticipants(prev => Math.max(1, prev - 1));
    });

    setCallFrame(frame);

    // Notify parent component that meeting started
    onMeetingStart?.();

    return () => {
      if (frame) {
        frame.destroy();
      }
      
      // Notify parent component that meeting ended
      onMeetingEnd?.();
    };
  }, [open, roomId, toast, onMeetingStart, onMeetingEnd]);

  const toggleMute = () => {
    if (callFrame) {
      callFrame.setLocalAudio(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (callFrame) {
      callFrame.setLocalVideo(!isVideoOff);
      setIsVideoOff(!isVideoOff);
    }
  };

  const toggleScreenShare = async () => {
    if (!callFrame) return;
    
    try {
      if (isScreenSharing) {
        await callFrame.stopScreenShare();
        setIsScreenSharing(false);
      } else {
        await callFrame.startScreenShare();
        setIsScreenSharing(true);
        toast({
          title: "Success",
          description: "Screen sharing started. Others can see your screen!",
        });
      }
    } catch (error) {
      console.error('Screen share error:', error);
      toast({
        title: "Error",
        description: "Failed to share screen. Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareCurrentView = async () => {
    if (!callFrame) return;
    
    try {
      // Start screen share with current tab
      await callFrame.startScreenShare({
        mediaStream: await navigator.mediaDevices.getDisplayMedia({
          video: {
            displaySurface: 'browser',
          },
        }),
      });
      setIsScreenSharing(true);
      toast({
        title: "Success",
        description: "Sharing current view! Navigate to whiteboard, code, or documents to share with others.",
      });
    } catch (error) {
      console.error('Share view error:', error);
      toast({
        title: "Error",
        description: "Failed to share view. Please allow screen sharing.",
        variant: "destructive",
      });
    }
  };

  const leaveCall = () => {
    if (callFrame) {
      callFrame.leave();
      callFrame.destroy();
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[80vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Circle Meeting
            <span className="text-sm text-muted-foreground ml-2">
              {participants} {participants === 1 ? 'participant' : 'participants'}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 px-6 pb-6 flex flex-col gap-4">
          {/* Video Grid */}
          <div 
            ref={containerRef} 
            className="flex-1 bg-slate-900 rounded-lg overflow-hidden"
          />

          {/* Controls */}
          <Card className="p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={isMuted ? "destructive" : "outline"}
                  onClick={toggleMute}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button
                  size="sm"
                  variant={isVideoOff ? "destructive" : "outline"}
                  onClick={toggleVideo}
                  title={isVideoOff ? "Turn on camera" : "Turn off camera"}
                >
                  {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={isScreenSharing ? "secondary" : "outline"}
                  onClick={toggleScreenShare}
                  title="Share entire screen"
                >
                  <MonitorUp className="h-4 w-4 mr-2" />
                  {isScreenSharing ? 'Stop Sharing' : 'Share Screen'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={shareCurrentView}
                  title="Share whiteboard, code, or documents"
                >
                  <MonitorUp className="h-4 w-4 mr-2" />
                  Share App View
                </Button>
              </div>

              <Button
                size="sm"
                variant="destructive"
                onClick={leaveCall}
                title="Leave call"
              >
                <PhoneOff className="h-4 w-4 mr-2" />
                Leave
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Use "Share App View" to show your whiteboard, code, or documents to other participants
            </p>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CircleMeeting;