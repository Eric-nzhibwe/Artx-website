// Challenges Page Logic

// Mobile Menu Toggle
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    if (nav) {
        nav.classList.toggle('active');
    }
}

let currentUserId = null;
let player = null;
let challenges = [];
let mySubmissions = [];
let currentChallenge = null;
let challengeTimer = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) {
        window.location.href = 'auth.html';
        return;
    }
    
    loadPlayerData();
    loadChallenges();
    loadMySubmissions();
    renderChallenges();
    renderMySubmissions();
});

// Authentication
function checkAuth() {
    currentUserId = localStorage.getItem('artCurrentUser');
    return currentUserId !== null;
}

function loadPlayerData() {
    if (!currentUserId) return;
    
    const saved = localStorage.getItem(`artPlayer_${currentUserId}`);
    if (saved) {
        player = JSON.parse(saved);
        updateUI();
    }
}

function updateUI() {
    document.getElementById('username').textContent = player.username;
    document.getElementById('userPrestige').textContent = player.prestige;
}

function logout() {
    if (confirm('Logout?')) {
        localStorage.removeItem('artCurrentUser');
        window.location.href = 'auth.html';
    }
}

// Load Challenges
function loadChallenges() {
    challenges = JSON.parse(localStorage.getItem('artChallenges') || '[]');
    // Filter only active challenges
    challenges = challenges.filter(c => c.status === 'active');
}

function loadMySubmissions() {
    const allSubmissions = JSON.parse(localStorage.getItem('artSubmissions') || '[]');
    mySubmissions = allSubmissions.filter(s => s.userId === currentUserId);
}

// Filter Challenges
function filterChallenges(difficulty) {
    // Update active filter
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    renderChallenges(difficulty);
}

// Render Challenges
function renderChallenges(filter = 'all') {
    const container = document.getElementById('challengesGrid');
    
    let filtered = challenges;
    if (filter !== 'all') {
        filtered = challenges.filter(c => c.difficulty === filter);
    }
    
    if (filtered.length === 0) {
        container.innerHTML = '<p style="color: #888; text-align: center; padding: 40px; grid-column: 1/-1;">No challenges available</p>';
        return;
    }
    
    container.innerHTML = filtered.map(challenge => {
        const timeRemaining = getTimeRemaining(challenge.endsAt);
        const hasSubmitted = mySubmissions.some(s => s.challengeId === challenge.id);
        const pointsRange = getPointsRange(challenge.difficulty);
        
        return `
            <div class="challenge-card" onclick="openChallenge('${challenge.id}')">
                <img src="${challenge.imageUrl}" alt="${challenge.title}" class="challenge-image">
                <div class="challenge-body">
                    <div class="challenge-header">
                        <div>
                            <h3 class="challenge-title">${challenge.title}</h3>
                            <span class="difficulty-badge difficulty-${challenge.difficulty}">${challenge.difficulty}</span>
                        </div>
                    </div>
                    <p class="challenge-description">${challenge.description}</p>
                    <div class="challenge-meta">
                        <span class="meta-item">
                            <i class="fas fa-clock"></i> ${challenge.timeLimit} min
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-calendar"></i> ${timeRemaining}
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-users"></i> ${challenge.submissions ? challenge.submissions.length : 0} entries
                        </span>
                    </div>
                </div>
                <div class="challenge-footer">
                    <span class="reward-badge"><i class="fas fa-star"></i> ${pointsRange}</span>
                    <button class="btn-participate" ${hasSubmitted ? 'disabled' : ''}>
                        ${hasSubmitted ? 'Submitted' : 'Participate'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function getPointsRange(difficulty) {
    const ranges = {
        easy: '10-30 pts',
        medium: '30-60 pts',
        hard: '60-100 pts',
        expert: '100-200 pts'
    };
    return ranges[difficulty] || '10-50 pts';
}

function getTimeRemaining(endDate) {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h left`;
    if (hours > 0) return `${hours}h left`;
    return 'Ending soon';
}

// Open Challenge
function openChallenge(challengeId) {
    currentChallenge = challenges.find(c => c.id === challengeId);
    if (!currentChallenge) return;
    
    const hasSubmitted = mySubmissions.some(s => s.challengeId === challengeId);
    
    document.getElementById('challengeContent').innerHTML = `
        <h2>${currentChallenge.title}</h2>
        <span class="difficulty-badge difficulty-${currentChallenge.difficulty}">${currentChallenge.difficulty}</span>
        
        <img src="${currentChallenge.imageUrl}" alt="${currentChallenge.title}" class="challenge-detail-image">
        
        <p style="color: #aaa; margin: 20px 0; line-height: 1.8;">${currentChallenge.description}</p>
        
        <div class="challenge-rules">
            <h3><i class="fas fa-list"></i> Submission Rules</h3>
            <ul>
                ${currentChallenge.submissionRules.map(rule => `<li>${rule}</li>`).join('')}
            </ul>
            <p style="margin-top: 15px; color: #888;">
                <i class="fas fa-info-circle"></i> 
                Word count: ${currentChallenge.minWordCount} - ${currentChallenge.maxWordCount} words
            </p>
        </div>
        
        ${hasSubmitted ? `
            <div style="background: rgba(76, 175, 80, 0.2); border: 1px solid #4caf50; padding: 20px; border-radius: 8px; text-align: center;">
                <i class="fas fa-check-circle" style="font-size: 48px; color: #4caf50; margin-bottom: 10px;"></i>
                <h3 style="color: #4caf50;">You've already submitted to this challenge!</h3>
                <p style="color: #aaa; margin-top: 10px;">Check your submissions below to see your score.</p>
            </div>
        ` : `
            <div class="timer-warning">
                <p><i class="fas fa-clock"></i> Time Limit: ${currentChallenge.timeLimit} minutes</p>
                <div class="timer-display" id="timerDisplay">Ready to start</div>
            </div>
            
            <div class="submission-form">
                <form onsubmit="submitInterpretation(event)">
                    <div class="form-group">
                        <label>Your Interpretation</label>
                        <textarea id="interpretationText" required placeholder="Share your interpretation of this image..." oninput="updateWordCount()"></textarea>
                        <div class="word-count" id="wordCount">0 / ${currentChallenge.maxWordCount} words</div>
                    </div>
                    
                    <button type="submit" class="btn-primary btn-large" id="submitBtn">
                        <i class="fas fa-paper-plane"></i> Submit Interpretation
                    </button>
                </form>
            </div>
        `}
    `;
    
    document.getElementById('challengeModal').style.display = 'block';
    
    if (!hasSubmitted) {
        startChallengeTimer();
    }
}

function closeChallengeModal() {
    document.getElementById('challengeModal').style.display = 'none';
    if (challengeTimer) {
        clearInterval(challengeTimer);
        challengeTimer = null;
    }
    currentChallenge = null;
}

// Challenge Timer
function startChallengeTimer() {
    const timeLimit = currentChallenge.timeLimit * 60; // Convert to seconds
    let timeRemaining = timeLimit;
    
    const timerDisplay = document.getElementById('timerDisplay');
    
    challengeTimer = setInterval(() => {
        timeRemaining--;
        
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        
        timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeRemaining <= 0) {
            clearInterval(challengeTimer);
            timerDisplay.textContent = 'Time\'s up!';
            document.getElementById('submitBtn').disabled = true;
            alert('Time\'s up! You can no longer submit to this challenge.');
        }
    }, 1000);
}

// Word Count
function updateWordCount() {
    const text = document.getElementById('interpretationText').value;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    document.getElementById('wordCount').textContent = `${wordCount} / ${currentChallenge.maxWordCount} words`;
    
    // Validate word count
    if (wordCount < currentChallenge.minWordCount || wordCount > currentChallenge.maxWordCount) {
        document.getElementById('wordCount').style.color = '#f44336';
    } else {
        document.getElementById('wordCount').style.color = '#4caf50';
    }
}

// Submit Interpretation
function submitInterpretation(event) {
    event.preventDefault();
    
    const interpretation = document.getElementById('interpretationText').value.trim();
    const words = interpretation.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    // Validate word count
    if (wordCount < currentChallenge.minWordCount) {
        alert(`Your interpretation is too short. Minimum ${currentChallenge.minWordCount} words required.`);
        return;
    }
    
    if (wordCount > currentChallenge.maxWordCount) {
        alert(`Your interpretation is too long. Maximum ${currentChallenge.maxWordCount} words allowed.`);
        return;
    }
    
    // Calculate score
    const score = calculateScore(interpretation, currentChallenge);
    
    // Create submission
    const submission = {
        id: Date.now().toString(),
        userId: currentUserId,
        username: player.username,
        challengeId: currentChallenge.id,
        challengeTitle: currentChallenge.title,
        interpretation: interpretation,
        wordCount: wordCount,
        score: score,
        submittedAt: new Date().toISOString(),
        status: 'scored'
    };
    
    // Save submission
    const allSubmissions = JSON.parse(localStorage.getItem('artSubmissions') || '[]');
    allSubmissions.push(submission);
    localStorage.setItem('artSubmissions', JSON.stringify(allSubmissions));
    
    // Update player prestige
    player.prestige += score;
    player.submissions = player.submissions || [];
    player.submissions.push({
        challengeId: currentChallenge.id,
        score: score,
        timestamp: new Date().toISOString()
    });
    
    localStorage.setItem(`artPlayer_${currentUserId}`, JSON.stringify(player));
    
    // Update users array
    const users = JSON.parse(localStorage.getItem('artUsers') || '[]');
    const userIndex = users.findIndex(u => u.id === currentUserId);
    if (userIndex !== -1) {
        users[userIndex] = player;
        localStorage.setItem('artUsers', JSON.stringify(users));
    }
    
    // Clear timer
    if (challengeTimer) {
        clearInterval(challengeTimer);
        challengeTimer = null;
    }
    
    alert(`Submission successful! You earned ${score} prestige points!`);
    
    closeChallengeModal();
    loadMySubmissions();
    renderMySubmissions();
    updateUI();
}

// Calculate Score
function calculateScore(interpretation, challenge) {
    const words = interpretation.split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    // Base score by difficulty
    const baseScores = {
        easy: { min: 10, max: 30 },
        medium: { min: 30, max: 60 },
        hard: { min: 60, max: 100 },
        expert: { min: 100, max: 200 }
    };
    
    const base = baseScores[challenge.difficulty];
    
    // Calculate score based on word count (more words = better detail)
    const wordRatio = Math.min(wordCount / challenge.maxWordCount, 1);
    
    // Random factor for creativity (simulated)
    const creativityFactor = 0.7 + Math.random() * 0.3;
    
    // Calculate final score
    const score = Math.floor(base.min + (base.max - base.min) * wordRatio * creativityFactor);
    
    return score;
}

// Render My Submissions
function renderMySubmissions() {
    const container = document.getElementById('mySubmissionsList');
    
    if (mySubmissions.length === 0) {
        container.innerHTML = '<p style="color: #888; text-align: center; padding: 40px;">No submissions yet. Start participating in challenges!</p>';
        return;
    }
    
    // Sort by date (newest first)
    mySubmissions.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
    
    container.innerHTML = mySubmissions.map(submission => `
        <div class="submission-item">
            <div class="submission-status ${submission.status === 'scored' ? 'status-scored' : 'status-pending'}">
                <i class="fas fa-${submission.status === 'scored' ? 'check' : 'clock'}"></i>
            </div>
            <div class="submission-info">
                <h4>${submission.challengeTitle}</h4>
                <p>Submitted ${new Date(submission.submittedAt).toLocaleString()}</p>
                <p style="margin-top: 5px;">${submission.wordCount} words</p>
            </div>
            <div class="submission-score">
                <div class="score-value">${submission.score}</div>
                <div class="score-label">POINTS</div>
            </div>
        </div>
    `).join('');
}

// Upload Content
function showUploadModal() {
    document.getElementById('uploadModal').style.display = 'block';
}

function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
    document.getElementById('uploadForm').reset();
    document.getElementById('uploadPreview').innerHTML = '';
}

function previewUploadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('uploadPreview').innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    }
}

function uploadContent(event) {
    event.preventDefault();
    
    const title = document.getElementById('uploadTitle').value;
    const description = document.getElementById('uploadDescription').value;
    const category = document.getElementById('uploadCategory').value;
    const imageFile = document.getElementById('uploadImage').files[0];
    
    if (!imageFile) {
        alert('Please select an image');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const ugc = {
            id: Date.now().toString(),
            userId: currentUserId,
            username: player.username,
            title: title,
            description: description,
            category: category,
            imageUrl: e.target.result,
            status: 'pending',
            uploadedAt: new Date().toISOString()
        };
        
        // Save to user generated content
        const allUGC = JSON.parse(localStorage.getItem('artUserContent') || '[]');
        allUGC.push(ugc);
        localStorage.setItem('artUserContent', JSON.stringify(allUGC));
        
        alert('Content uploaded successfully! It will be reviewed by admins.');
        closeUploadModal();
    };
    reader.readAsDataURL(imageFile);
}

// Make functions global
window.toggleMobileMenu = toggleMobileMenu;
window.logout = logout;
window.filterChallenges = filterChallenges;
window.openChallenge = openChallenge;
window.closeChallengeModal = closeChallengeModal;
window.updateWordCount = updateWordCount;
window.submitInterpretation = submitInterpretation;
window.showUploadModal = showUploadModal;
window.closeUploadModal = closeUploadModal;
window.previewUploadImage = previewUploadImage;
window.uploadContent = uploadContent;
