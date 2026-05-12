# ART Platform - Setup & Testing Guide

## Quick Start

### 1. Open the Platform
Simply open `auth.html` in your web browser (Chrome, Firefox, Edge, Safari)

### 2. Create Your First Account

#### Regular User Account:
- Username: `testuser` (or any name except "admin")
- Email: `test@example.com`
- Password: `password123`

#### Admin Account:
- Username: `admin` (must be exactly "admin")
- Email: `admin@example.com`
- Password: `admin123`

## Testing the Challenge System

### As Admin:

1. **Login with admin account**
   - You'll see an "Admin" button in the navigation

2. **Access Admin Dashboard**
   - Click the "Admin" button
   - You'll see the admin panel with statistics

3. **Create Your First Challenge**
   - Click "Create Challenge" button
   - Fill in the form:
     - Title: "Interpret the Sunset"
     - Difficulty: Medium
     - Time Limit: 30 minutes
     - Challenge Window: 24 hours
     - Description: "Describe what this sunset means to you"
     - Upload an image (any sunset photo)
     - Submission Rules (one per line):
       ```
       Be creative and original
       Focus on emotions and feelings
       Use descriptive language
       ```
     - Min Word Count: 50
     - Max Word Count: 300
     - Scoring Criteria:
       - Creativity: 40%
       - Relevance: 30%
       - Detail: 30%
   - Click "Create Challenge"

4. **View Your Challenge**
   - Go to "Challenges" section in admin panel
   - You'll see your newly created challenge

### As Regular User:

1. **Login with regular account**
   - Navigate to main dashboard

2. **View Challenges**
   - Click "Challenges" in the navigation
   - You'll see all active challenges

3. **Participate in a Challenge**
   - Click on a challenge card
   - Read the rules and view the image
   - Notice the timer starts automatically
   - Write your interpretation in the text area
   - Watch the word count update
   - Click "Submit Interpretation"
   - Receive your score!

4. **Upload Your Own Content**
   - Click "Upload Content" button
   - Fill in:
     - Title: "My Artwork"
     - Description: "A beautiful landscape"
     - Category: Art
     - Upload an image
   - Submit for review

5. **Check Your Submissions**
   - Scroll down to "My Submissions" section
   - See your score and submission details

### As Admin (Review Content):

1. **Go to Admin Dashboard**
   - Click "User Content" section

2. **Review Pending Uploads**
   - Click "Pending Review" filter
   - See user-uploaded content
   - Click "Approve" or "Reject"

3. **View Submissions**
   - Click "Submissions" section
   - Filter by challenge
   - Click on a submission to view details

## Testing Different Scenarios

### Test 1: Time Limit
1. Open a challenge
2. Wait for the timer to run out
3. Try to submit - should be blocked

### Test 2: Word Count Validation
1. Open a challenge
2. Write less than minimum words
3. Try to submit - should show error
4. Write more than maximum words
5. Try to submit - should show error

### Test 3: Multiple Submissions
1. Submit to a challenge
2. Try to submit again
3. Should see "Already submitted" message

### Test 4: Difficulty Levels
1. Create challenges with different difficulties
2. Submit to each
3. Notice different point ranges

### Test 5: User Content Workflow
1. Upload content as user
2. Login as admin
3. Review and approve content
4. Content status changes to "Approved"

## Data Storage

All data is stored in browser's localStorage:
- Open browser DevTools (F12)
- Go to Application/Storage tab
- Click on Local Storage
- See all stored data:
  - `artUsers` - All users
  - `artChallenges` - All challenges
  - `artSubmissions` - All submissions
  - `artUserContent` - User uploads
  - `artCurrentUser` - Current session
  - `artPlayer_{id}` - Individual profiles

## Clearing Data

To reset everything:
1. Open browser DevTools (F12)
2. Go to Application/Storage
3. Right-click on Local Storage
4. Click "Clear"
5. Refresh the page

## Troubleshooting

### Issue: Can't see Admin button
- Make sure you signed up with username "admin" (case-insensitive)
- Logout and login again
- Check localStorage for `isAdmin: true` in your user object

### Issue: Challenge image not showing
- Make sure you selected an image file
- Check file size (keep under 5MB for localStorage)
- Try a different image format (JPG, PNG)

### Issue: Timer not working
- Make sure JavaScript is enabled
- Check browser console for errors (F12)
- Refresh the page and try again

### Issue: Submissions not saving
- Check localStorage isn't full (5-10MB limit)
- Clear old data if needed
- Try a shorter interpretation

## Browser Compatibility

Tested on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

## Performance Tips

1. **Keep localStorage clean**
   - Don't create too many challenges
   - Clear old submissions periodically

2. **Image sizes**
   - Compress images before upload
   - Recommended: 800x600px, under 500KB

3. **Browser choice**
   - Chrome/Edge recommended for best performance
   - Safari may have localStorage limits

## Next Steps

After testing:
1. Create multiple challenges with different difficulties
2. Test with multiple user accounts
3. Build up a leaderboard
4. Experiment with scoring criteria
5. Try different image types

## Demo Scenarios

### Scenario 1: Art Competition
- Create 3 challenges with abstract art images
- Set different difficulty levels
- Have users compete for highest scores

### Scenario 2: Photography Challenge
- Upload nature photography
- Set tight time limits (10 minutes)
- Focus on quick, creative responses

### Scenario 3: User Gallery
- Have users upload their artwork
- Admin curates the best submissions
- Approved content becomes challenges

## Support

For issues or questions:
- Check browser console for errors
- Review this guide
- Check README.md for detailed documentation

---

**Happy Testing!** 🎨🏆
