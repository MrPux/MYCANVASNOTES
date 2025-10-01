import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, X } from 'lucide-react';

interface MeetingNotificationProps {
  onJoin: () => void;
  onDecline: () => void;
}

const MeetingNotification: React.FC<MeetingNotificationProps> = ({ onJoin, onDecline }) => {
  return (
    <Card className="fixed bottom-4 right-4 z-50 p-4 w-80 shadow-lg border-primary/20 bg-card animate-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          <Video className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1">Circle Meeting Started</h4>
          <p className="text-xs text-muted-foreground mb-3">
            A teammate has started a video call. Join now to collaborate!
          </p>
          <div className="flex gap-2">
            <Button 
              onClick={onJoin} 
              size="sm" 
              className="flex-1"
            >
              Join
            </Button>
            <Button 
              onClick={onDecline} 
              size="sm" 
              variant="outline"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MeetingNotification;
