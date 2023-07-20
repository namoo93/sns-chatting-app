interface MediaPlacement {
  AudioHostUrl?: string;
  AudioFallbackUrl?: string;
  ScreenDataUrl?: string;
  ScreenSharingUrl?: string;
  ScreenViewingUrl?: string;
  SignalingUrl?: string;
  TurnControlUrl?: string;
  EventIngestionUrl?: string;
}

class Call {
  type?: string;
  MeetingId?: string;
  ExternalMeetingId?: string;
  MediaRegion?: string;
  MediaPlacement?: MediaPlacement[] | MediaPlacement;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Call;
