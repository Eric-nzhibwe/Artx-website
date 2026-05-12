# Phase 3 Testing Guide

## Complete Testing Scenarios for Community & Influencer Features

### Prerequisites
- Open `auth.html` in your browser
- Have at least 2 user accounts ready
- One admin account (username: "admin")

---

## Test Suite 1: Upvoting System

### Test 1.1: Basic Voting
**Steps:**
1. Create User A and User B accounts
2. Login as User A
3. Go to Challenges page
4. Complete a challenge and submit
5. Logout and login as User B
6. Complete the same challenge
7. Go to Community page
8. Find User A's submission
9. Click upvote button
10. Verify vote count increases
11. Check coin balance increased by 1

**Expected Results:**
- ✅ Upvote button turns green
- ✅ Vote count shows +1
- ✅ Net votes updates
- ✅ Coin balance +1

### Test 1.2: Vote Toggle
**Steps:**
1. Continue from Test 1.1
2. Click upvote button again
3. Verify vote is removed
4. Click downvote button
5. Verify downvote is registered

**Expected Results:**
- ✅ Upvote toggles off
- ✅ Downvote turns red
- ✅ Vote counts update correctly
- ✅ Net votes recalculates

### Test 1.3: Author Rewards
**Steps:**
1. Login as User A
2. Check coin balance
3. Have 4 other users upvote your submission
4. Check coin balance after 5th upvote
5. Verify +5 coins received

**Expected Results:**
- ✅ No coins for first 4 upvotes
- ✅ +5 coins on 5th upvote
- ✅ Balance updates in real-time

### Test 1.4: Sorting Options
**Steps:**
1. Go to Community page
2. Select "Most Recent" sort
3. Verify newest submissions first
4. Select "Most Popular" sort
5. Verify highest voted first
6. Select "Controversial" sort
7. Verify mixed votes first

**Expected Results:**
- ✅ Each sort works correctly
- ✅ Order changes appropriately
- ✅ Filters apply instantly

### Test 1.5: Detailed View
**Steps:**
1. Click on any interpretation card
2. Verify modal opens
3. Check full text visible
4. Vote from modal
5. Verify vote registers
6. Close modal

**Expected Results:**
- ✅ Modal displays full content
- ✅ User info shown
- ✅ Voting works in modal
- ✅ Stats update

---

## Test Suite 2: Virtual Currency & Rewards

### Test 2.1: Earning Coins
**Steps:**
1. Login as new user
2. Note starting balance (0)
3. Upvote 5 submissions
4. Check balance (+5 coins)
5. Follow 2 influencers
6. Check balance (+10 coins)
7. Complete a challenge
8. Verify total earnings

**Expected Results:**
- ✅ Each action awards coins
- ✅ Balance updates immediately
- ✅ Coin icon shows in header

### Test 2.2: Rewards Shop
**Steps:**
1. Ensure you have 50+ coins
2. Go to Community → Rewards tab
3. Click "Buy Now" on Challenge Boost
4. Confirm purchase
5. Check balance decreased by 50
6. Verify reward in inventory

**Expected Results:**
- ✅ Purchase confirmation shown
- ✅ Balance deducts correctly
- ✅ Reward added to player.rewards
- ✅ Success message displayed

### Test 2.3: Insufficient Funds
**Steps:**
1. Set balance to 20 coins
2. Try to buy 50 coin item
3. Verify error message
4. Check balance unchanged

**Expected Results:**
- ✅ Error alert shown
- ✅ Purchase blocked
- ✅ Balance unchanged

### Test 2.4: Multiple Purchases
**Steps:**
1. Buy Extra Time (30 coins)
2. Buy Challenge Boost (50 coins)
3. Buy Prestige Boost (100 coins)
4. Verify all in rewards array
5. Check total deduction

**Expected Results:**
- ✅ All purchases successful
- ✅ Balance = starting - 180
- ✅ 3 items in rewards

### Test 2.5: Prestige Boost Application
**Steps:**
1. Note current prestige
2. Buy Prestige Boost (100 coins)
3. Check prestige increased by 100
4. Verify immediate application

**Expected Results:**
- ✅ Prestige +100 instantly
- ✅ Tier may upgrade
- ✅ Dashboard reflects change

---

## Test Suite 3: Influencer System

### Test 3.1: Browse Influencers
**Steps:**
1. Go to Influencers page
2. View all 6 influencers
3. Check verified badges
4. Read bios
5. View stats

**Expected Results:**
- ✅ 6 influencers displayed
- ✅ All have verified badges
- ✅ Stats show correctly
- ✅ Cards are clickable

### Test 3.2: Follow System
**Steps:**
1. Click "Follow" on ArtMaster Pro
2. Verify button changes to "Following"
3. Check coin balance +5
4. Click "Following" to unfollow
5. Verify button reverts

**Expected Results:**
- ✅ Follow button toggles
- ✅ +5 coins on follow
- ✅ No coins on unfollow
- ✅ Following list updates

### Test 3.3: Influencer Details
**Steps:**
1. Click "View" on any influencer
2. Modal opens with full profile
3. Check follower count
4. View upcoming events
5. Follow from modal

**Expected Results:**
- ✅ Modal shows complete info
- ✅ Events listed
- ✅ Follow works in modal
- ✅ Stats displayed

### Test 3.4: Multiple Follows
**Steps:**
1. Follow all 6 influencers
2. Check coin balance +30
3. Verify all show "Following"
4. Check player.following array

**Expected Results:**
- ✅ All 6 followed
- ✅ +30 coins total
- ✅ Array has 6 IDs
- ✅ UI updates everywhere

---

## Test Suite 4: Weekly Events

### Test 4.1: View Events
**Steps:**
1. Go to Influencers → Weekly Events tab
2. View all 4 events
3. Check status badges (Active/Upcoming)
4. Note prize amounts
5. Check participant counts

**Expected Results:**
- ✅ 4 events displayed
- ✅ Status badges correct
- ✅ Prizes shown
- ✅ Dates visible

### Test 4.2: Event Details
**Steps:**
1. Click on "Speed Challenge Marathon"
2. Modal opens
3. View full description
4. Check prize pool (300 coins)
5. See participant count
6. Note days remaining

**Expected Results:**
- ✅ Modal shows all details
- ✅ Host name displayed
- ✅ Stats grid visible
- ✅ Join button present

### Test 4.3: Event Registration
**Steps:**
1. Click "Join Now" on active event
2. Verify confirmation message
3. Click "Register" on upcoming event
4. Verify registration message

**Expected Results:**
- ✅ Confirmation alerts shown
- ✅ Different messages for active/upcoming
- ✅ No errors

### Test 4.4: Tier-Restricted Events
**Steps:**
1. View "Elite Masters Tournament"
2. Note "Platinum+ only" requirement
3. Try to join with Bronze tier
4. Verify restriction message (future)

**Expected Results:**
- ✅ Tier requirement visible
- ✅ Restriction noted
- ✅ UI indicates exclusivity

---

## Test Suite 5: Advanced Challenge Types

### Test 5.1: Daily Open Challenge
**Steps:**
1. Go to Influencers → Special Challenges tab
2. Find "Daily Open Challenge"
3. Note green badge
4. Check 30-minute time limit
5. See 50 coin reward
6. Click to participate

**Expected Results:**
- ✅ Green "Daily" badge
- ✅ Correct time limit
- ✅ Reward amount shown
- ✅ Redirects to challenges page

### Test 5.2: Weekly Elite Challenge
**Steps:**
1. Find "Weekly Elite Challenge"
2. Note blue badge
3. Check 60-minute limit
4. See 150 coin reward
5. Note "Resets Monday" text

**Expected Results:**
- ✅ Blue "Weekly" badge
- ✅ Higher difficulty
- ✅ Larger reward
- ✅ Reset info visible

### Test 5.3: Speed-Based Challenge
**Steps:**
1. Find "Speed Blitz"
2. Note orange badge
3. Check 5-minute limit
4. See 30 coin reward
5. Note participant count

**Expected Results:**
- ✅ Orange "Speed" badge
- ✅ Very short time limit
- ✅ Quick reward
- ✅ High participation

### Test 5.4: Tier-Restricted Challenge
**Steps:**
1. Find "Gold Tier Exclusive"
2. Note purple badge
3. Check "Gold+ only" requirement
4. See 250 coin reward
5. Note 90-minute limit

**Expected Results:**
- ✅ Purple "Tier" badge
- ✅ Tier requirement shown
- ✅ Highest reward
- ✅ Expert difficulty

### Test 5.5: Challenge Type Filtering
**Steps:**
1. Count total challenges
2. Note different type badges
3. Verify color coding
4. Check time limits vary
5. Compare rewards

**Expected Results:**
- ✅ 6 special challenges
- ✅ 4 distinct types
- ✅ Color-coded badges
- ✅ Varied parameters

---

## Test Suite 6: Top Interpretations

### Test 6.1: Weekly Rankings
**Steps:**
1. Go to Community → Top Interpretations tab
2. Select "This Week"
3. View top 10 list
4. Check rank badges (🥇🥈🥉)
5. Note net votes

**Expected Results:**
- ✅ Top 10 displayed
- ✅ Gold/Silver/Bronze badges
- ✅ Sorted by net votes
- ✅ Stats shown

### Test 6.2: Monthly Rankings
**Steps:**
1. Click "This Month" filter
2. Verify list updates
3. Check different submissions
4. Note date range

**Expected Results:**
- ✅ Filter applies
- ✅ Last 30 days only
- ✅ Re-sorted correctly

### Test 6.3: All-Time Rankings
**Steps:**
1. Click "All Time" filter
2. View historical best
3. Check highest scores
4. Note submission dates

**Expected Results:**
- ✅ All submissions included
- ✅ Highest voted ever
- ✅ Dates may be old

### Test 6.4: Rank Details
**Steps:**
1. Click on #1 ranked item
2. Modal opens
3. View full interpretation
4. Check vote counts
5. Vote from modal

**Expected Results:**
- ✅ Full content shown
- ✅ High vote counts
- ✅ Can still vote
- ✅ Stats accurate

---

## Test Suite 7: Integration Tests

### Test 7.1: Complete User Journey
**Steps:**
1. Create new account
2. Complete a challenge (+score, +coins)
3. Browse community feed
4. Upvote 3 submissions (+3 coins)
5. Follow 2 influencers (+10 coins)
6. Buy Challenge Boost (-50 coins)
7. Register for event
8. Check all balances

**Expected Results:**
- ✅ All actions work together
- ✅ Coins accumulate correctly
- ✅ No conflicts
- ✅ Data persists

### Test 7.2: Multi-User Interaction
**Steps:**
1. User A submits interpretation
2. User B upvotes it
3. User C upvotes it
4. User D upvotes it
5. User E upvotes it
6. User F upvotes it (5th vote)
7. Check User A gets +5 coins
8. Check all voters got +1 coin

**Expected Results:**
- ✅ All votes register
- ✅ Author rewarded at 5 votes
- ✅ All voters rewarded
- ✅ Counts accurate

### Test 7.3: Cross-Page Navigation
**Steps:**
1. Start on Dashboard
2. Go to Challenges
3. Go to Community
4. Go to Influencers
5. Back to Dashboard
6. Check all data persists

**Expected Results:**
- ✅ Navigation smooth
- ✅ Data loads correctly
- ✅ No data loss
- ✅ UI consistent

### Test 7.4: Logout/Login Persistence
**Steps:**
1. Earn 50 coins
2. Follow 2 influencers
3. Upvote 5 submissions
4. Logout
5. Login again
6. Verify all data intact

**Expected Results:**
- ✅ Coins preserved
- ✅ Following list intact
- ✅ Votes remembered
- ✅ No data loss

---

## Test Suite 8: Edge Cases

### Test 8.1: Self-Voting Prevention
**Steps:**
1. Submit an interpretation
2. Go to Community feed
3. Try to find your own submission
4. Verify it's not shown

**Expected Results:**
- ✅ Own submissions filtered out
- ✅ Can't vote on own work

### Test 8.2: Duplicate Vote Prevention
**Steps:**
1. Upvote a submission
2. Refresh page
3. Try to upvote again
4. Verify vote persists

**Expected Results:**
- ✅ Vote remembered
- ✅ Button shows "upvoted"
- ✅ Can't double-vote

### Test 8.3: Zero Balance Purchases
**Steps:**
1. Set balance to 0
2. Try to buy any reward
3. Verify error message

**Expected Results:**
- ✅ Purchase blocked
- ✅ Clear error message

### Test 8.4: Empty States
**Steps:**
1. New user with no submissions
2. Check Community feed
3. Check Top Interpretations
4. Verify empty state messages

**Expected Results:**
- ✅ Friendly empty messages
- ✅ No errors
- ✅ UI handles gracefully

---

## Performance Tests

### Test P.1: Large Vote Counts
**Steps:**
1. Simulate 100+ votes on submission
2. Check rendering performance
3. Verify counts display correctly

**Expected Results:**
- ✅ No lag
- ✅ Numbers format correctly
- ✅ UI responsive

### Test P.2: Many Submissions
**Steps:**
1. Create 50+ submissions
2. Load Community feed
3. Check scroll performance
4. Test sorting

**Expected Results:**
- ✅ Loads quickly
- ✅ Smooth scrolling
- ✅ Sorting works

### Test P.3: localStorage Limits
**Steps:**
1. Monitor localStorage size
2. Add many submissions
3. Check for warnings
4. Test data persistence

**Expected Results:**
- ✅ Within 5MB limit
- ✅ No errors
- ✅ Data saves

---

## Bug Checklist

Common issues to watch for:
- [ ] Vote counts not updating
- [ ] Coin balance not syncing
- [ ] Following list not persisting
- [ ] Modal not closing
- [ ] Navigation breaking
- [ ] Data loss on refresh
- [ ] Duplicate votes
- [ ] Self-voting allowed
- [ ] Negative balances
- [ ] Reward not applying

---

## Success Criteria

Phase 3 is successful if:
- ✅ All upvoting features work
- ✅ Virtual currency system functional
- ✅ Rewards shop operational
- ✅ Influencer profiles load
- ✅ Events display correctly
- ✅ Challenge types show
- ✅ Top rankings work
- ✅ No critical bugs
- ✅ Data persists
- ✅ Performance acceptable

---

## Reporting Issues

When reporting bugs, include:
1. Steps to reproduce
2. Expected behavior
3. Actual behavior
4. Browser/OS
5. Console errors
6. localStorage state

---

**Happy Testing!** 🧪✅

Test thoroughly and enjoy the new features! 🎉
