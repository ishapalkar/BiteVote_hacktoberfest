import React, { useState, useEffect, useRef } from 'react';
import { api } from './api';
import Header from './components/Header';
import Hero from './components/Hero';
import LobbyView from './components/LobbyView';
import VotingDeck from './components/VotingDeck';
import ResultView from './components/ResultView';
import PreferencesModal from './components/PreferencesModal';
import RestaurantModal from './components/RestaurantModal';
import HackathonFooter from './components/HackathonFooter';

export default function App() {
  const [room, setRoom] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bitevote_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [restaurants, setRestaurants] = useState([]);
  const [dbStatus, setDbStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingDecide, setLoadingDecide] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [inspectRestaurant, setInspectRestaurant] = useState(null);
  const [errorToast, setErrorToast] = useState('');

  const pollingRef = useRef(null);

  // 1. Initial Load: Fetch Restaurants & Health
  useEffect(() => {
    api.getRestaurants()
      .then(data => setRestaurants(data))
      .catch(err => console.error("Could not load restaurants:", err));

    api.getHealth()
      .then(data => setDbStatus(data.database))
      .catch(err => console.error("Health check error:", err));

    // Check if room code exists in URL
    const params = new URLSearchParams(window.location.search);
    const roomParam = params.get('room');
    if (roomParam) {
      loadRoomByCode(roomParam);
    }
  }, []);

  // Save current user to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('bitevote_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  // 2. Room Polling: Sync room state every 3 seconds when in a room
  useEffect(() => {
    if (!room?.code) {
      if (pollingRef.current) clearInterval(pollingRef.current);
      return;
    }

    const poll = async () => {
      try {
        const updatedRoom = await api.getRoom(room.code);
        setRoom(updatedRoom);
      } catch (err) {
        console.warn("Polling error for room:", err);
      }
    };

    pollingRef.current = setInterval(poll, 3000);
    return () => clearInterval(pollingRef.current);
  }, [room?.code]);

  const loadRoomByCode = async (code) => {
    try {
      setLoading(true);
      const data = await api.getRoom(code);
      setRoom(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showError = (msg) => {
    setErrorToast(msg);
    setTimeout(() => setErrorToast(''), 4000);
  };

  // Create Room
  const handleCreateRoom = async (formData) => {
    try {
      setLoading(true);
      const newRoom = await api.createRoom(formData);
      const host = newRoom.participants[0];
      setCurrentUser(host);
      setRoom(newRoom);
      window.history.pushState({}, '', `?room=${newRoom.code}`);
      setShowPreferencesModal(true);
    } catch (err) {
      showError(err.message || 'Failed to create room.');
    } finally {
      setLoading(false);
    }
  };

  // Join Room
  const handleJoinRoom = async (code, formData) => {
    setLoading(true);
    try {
      const updatedRoom = await api.joinRoom(code, {
        name: formData.name,
        avatar: formData.avatar,
        participant_id: currentUser?.id,
      });
      const me = updatedRoom.participants.find(p => p.name === formData.name) || updatedRoom.participants[updatedRoom.participants.length - 1];
      setCurrentUser(me);
      setRoom(updatedRoom);
      window.history.pushState({}, '', `?room=${updatedRoom.code}`);
      setShowPreferencesModal(true);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Instant 3-Friend Demo tailored to Mumbai Example:
  // Sarah (Jain + ₹300–500 + Maharashtrian)
  // Rahul (Vegetarian + ₹400–700 + North Indian)
  // Aisha (Vegetarian + ₹300–600 + Indo-Chinese)
  const handleInstantDemo = async () => {
    try {
      setLoading(true);
      // 1. Create Room in Mumbai with food avatars
      const demoRoom = await api.createRoom({
        name: "Mumbai Friday Dinner Dilemma",
        host_name: "Sarah (Host)",
        host_avatar: "food-samosa",
        city: "Mumbai"
      });
      
      const hostId = demoRoom.participants[0].id;

      // 2. Set Sarah's preferences: Jain + ₹300-500 + Maharashtrian
      await api.updatePreferences(demoRoom.code, hostId, {
        dietary: { pure_veg: true, jain: true, vegetarian: true, vegan: false, eggless: true, halal: false, gluten_free: false, lactose_free: false, nut_free: false },
        cravings: ["Maharashtrian", "Street Food / Chaat"],
        dislikes: [],
        budget_tier: "₹₹",
        budget_min: 300,
        budget_max: 500,
        vibe: "Family Dining & Casual",
        max_distance: 5.0
      });

      // 3. Add Rahul: Vegetarian + ₹400-700 + North Indian
      const roomWithRahul = await api.joinRoom(demoRoom.code, {
        name: "Rahul",
        avatar: "food-dosa"
      });
      const rahulId = roomWithRahul.participants.find(p => p.name === "Rahul").id;
      await api.updatePreferences(demoRoom.code, rahulId, {
        dietary: { pure_veg: false, jain: false, vegetarian: true, vegan: false, eggless: false, halal: false, gluten_free: false, lactose_free: false, nut_free: false },
        cravings: ["North Indian", "Punjabi Tandoor"],
        dislikes: [],
        budget_tier: "₹₹",
        budget_min: 400,
        budget_max: 700,
        vibe: "Family Dining & Casual",
        max_distance: 5.0
      });

      // 4. Add Aisha: Vegetarian + ₹300-600 + Indo-Chinese
      const roomWithAisha = await api.joinRoom(demoRoom.code, {
        name: "Aisha",
        avatar: "food-biryani"
      });
      const aishaId = roomWithAisha.participants.find(p => p.name === "Aisha").id;
      await api.updatePreferences(demoRoom.code, aishaId, {
        dietary: { pure_veg: false, jain: false, vegetarian: true, vegan: false, eggless: false, halal: false, gluten_free: false, lactose_free: false, nut_free: false },
        cravings: ["Indo-Chinese", "Street Food / Chaat"],
        dislikes: [],
        budget_tier: "₹₹",
        budget_min: 300,
        budget_max: 600,
        vibe: "Family Dining & Casual",
        max_distance: 5.0
      });

      // 5. Pre-cast votes
      await api.submitVotes(demoRoom.code, {
        participant_id: hostId,
        votes: { "mum-1": "like", "mum-2": "like", "mum-3": "like" }
      });
      await api.submitVotes(demoRoom.code, {
        participant_id: rahulId,
        votes: { "mum-3": "like", "mum-4": "like" }
      });
      await api.submitVotes(demoRoom.code, {
        participant_id: aishaId,
        votes: { "mum-3": "like", "mum-5": "like" }
      });

      // 6. Transition to voting
      await api.updateRoomStatus(demoRoom.code, "voting");

      const finalRoom = await api.getRoom(demoRoom.code);
      setCurrentUser(finalRoom.participants[0]);
      setRoom(finalRoom);
      window.history.pushState({}, '', `?room=${finalRoom.code}`);
    } catch (err) {
      showError("Could not start demo: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Save preferences
  const handleSavePreferences = async (prefs) => {
    if (!room || !currentUser) return;
    try {
      const updated = await api.updatePreferences(room.code, currentUser.id, prefs);
      setRoom(updated);
      setShowPreferencesModal(false);
    } catch (err) {
      showError(err.message || 'Failed to save preferences.');
    }
  };

  // Start Voting
  const handleStartVoting = async () => {
    if (!room) return;
    try {
      const updated = await api.updateRoomStatus(room.code, 'voting');
      setRoom(updated);
    } catch (err) {
      showError(err.message || 'Failed to start voting.');
    }
  };

  // Cast Votes
  const handleVoteComplete = async (votes) => {
    if (!room || !currentUser) return;
    try {
      const updated = await api.submitVotes(room.code, {
        participant_id: currentUser.id,
        votes,
      });
      setRoom(updated);
    } catch (err) {
      showError(err.message || 'Failed to submit votes.');
    }
  };

  // Trigger Gemma Decision
  const handleTriggerDecide = async () => {
    if (!room) return;
    try {
      setLoadingDecide(true);
      const updated = await api.decideRoom(room.code);
      setRoom(updated);
    } catch (err) {
      showError(err.message || 'Gemma arbitration encountered an issue.');
    } finally {
      setLoadingDecide(false);
    }
  };

  // Add Simulated Friend in Lobby using food avatars
  const handleAddSimulatedFriend = async () => {
    if (!room) return;
    try {
      const friendsPool = [
        { name: "Pooja", avatar: "food-momos", diet: { pure_veg: true, jain: true, vegetarian: true }, cravings: ["Gujarati Thali", "Street Food / Chaat"], budget_min: 250, budget_max: 500 },
        { name: "Kabir", avatar: "food-chai", diet: { pure_veg: false, jain: false, vegetarian: false, halal: true }, cravings: ["Biryani & Kebabs", "Mughlai"], budget_min: 500, budget_max: 900 },
        { name: "Ananya", avatar: "food-pav", diet: { pure_veg: false, jain: false, vegetarian: true, eggless: true }, cravings: ["South Indian / Dosa", "Continental & Bakery"], budget_min: 200, budget_max: 450 }
      ];
      
      const newFriend = friendsPool[room.participants.length % friendsPool.length];
      const updated = await api.joinRoom(room.code, {
        name: `${newFriend.name}`,
        avatar: newFriend.avatar
      });

      const addedP = updated.participants[updated.participants.length - 1];
      await api.updatePreferences(room.code, addedP.id, {
        dietary: newFriend.diet,
        cravings: newFriend.cravings,
        dislikes: [],
        budget_tier: "₹₹",
        budget_min: newFriend.budget_min,
        budget_max: newFriend.budget_max,
        vibe: "Family Dining & Casual",
        max_distance: 5.0
      });

      const refreshed = await api.getRoom(room.code);
      setRoom(refreshed);
    } catch (err) {
      showError("Could not add simulated friend: " + err.message);
    }
  };

  // Reset Room
  const handleResetRoom = async () => {
    if (!room) return;
    try {
      const updated = await api.resetRoom(room.code);
      setRoom(updated);
    } catch (err) {
      showError(err.message || 'Failed to reset room.');
    }
  };

  // Leave Room
  const handleLeaveRoom = () => {
    setRoom(null);
    window.history.pushState({}, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100">
      <div>
        {/* Navigation Header */}
        <Header 
          room={room} 
          user={currentUser} 
          onLeaveRoom={handleLeaveRoom} 
          dbStatus={dbStatus} 
        />

        {/* Global Toast for errors */}
        {errorToast && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-rose-600 text-white font-semibold text-xs shadow-2xl">
            {errorToast}
          </div>
        )}

        {/* Main Content Router based on Room Status */}
        <main>
          {!room ? (
            <Hero
              onCreateRoom={handleCreateRoom}
              onJoinRoom={handleJoinRoom}
              onInstantDemo={handleInstantDemo}
              loading={loading}
            />
          ) : room.status === 'lobby' ? (
            <LobbyView
              room={room}
              currentUser={currentUser}
              onStartVoting={handleStartVoting}
              onOpenPreferences={() => setShowPreferencesModal(true)}
              onAddSimulatedFriend={handleAddSimulatedFriend}
              restaurants={restaurants}
            />
          ) : room.status === 'voting' ? (
            <VotingDeck
              restaurants={restaurants}
              onVoteComplete={handleVoteComplete}
              onTriggerDecide={handleTriggerDecide}
              room={room}
              currentUser={currentUser}
              loadingDecide={loadingDecide}
              onOpenDetails={(r) => setInspectRestaurant(r)}
            />
          ) : room.status === 'decided' ? (
            <ResultView
              room={room}
              restaurants={restaurants}
              onReset={handleResetRoom}
              currentUser={currentUser}
            />
          ) : null}
        </main>
      </div>

      {/* Preferences Modal */}
      {showPreferencesModal && (
        <PreferencesModal
          isOpen={showPreferencesModal}
          onClose={() => setShowPreferencesModal(false)}
          currentPreferences={currentUser?.preferences}
          onSave={handleSavePreferences}
          participantName={currentUser?.name}
        />
      )}

      {/* Restaurant Inspector Modal */}
      {inspectRestaurant && (
        <RestaurantModal
          restaurant={inspectRestaurant}
          onClose={() => setInspectRestaurant(null)}
        />
      )}

      {/* Hackathon Footer */}
      <HackathonFooter />
    </div>
  );
}
