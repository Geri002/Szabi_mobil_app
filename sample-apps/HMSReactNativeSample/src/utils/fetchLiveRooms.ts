export async function fetchLiveRooms(): Promise<string | null> {
  try {
    const response = await fetch(
      'https://us-central1-balaton-autosisklola-live.cloudfunctions.net/getLiveRooms',
    );
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    if (data.length > 0) {
      return data[0].meeting_url;
    }
    return null;
  } catch (error) {
    console.error('Error fetching live rooms:', error);
    return null;
  }
}
