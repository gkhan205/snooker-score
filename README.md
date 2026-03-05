# Snooker Frame Tracker

A lightweight score tracking app for a custom snooker-style game played with **3–5 players across two frames**. The app is designed to make it easy to record scores during live play and automatically calculate frame results and final standings.

## Overview

This application helps players track scores for a variation of snooker where each player competes individually and final frame scores are calculated using the **difference between a player’s score and the next player in the playing order**.

The system keeps the original player order for Frame 1 and automatically **reverses the order in Frame 2** to keep gameplay balanced.

After both frames are completed, the app calculates the **total score for each player** and determines the loser(s).

## Game Rules

* The game supports **3 to 5 players**.
* The match consists of **2 frames**.
* Each player records their own score during each frame.
* At the end of the frame, the app calculates the **Frame Result**:
  * The result is the **difference between the player's score and the next player in the playing order**.
  * Frame 2 automatically **reverses the player order** used in Frame 1.
* The **Final Score** is calculated by adding the Frame 1 result and Frame 2 result.

### Determining the Loser

* If **3 or 4 players** are playing → the player with the **lowest total score loses**.
* If **5 players** are playing → the **bottom two players lose**.

## Features

* Quick score entry optimized for live gameplay
* Clear player ordering for accurate frame calculations
* Automatic frame result calculation
* Automatic player order reversal for Frame 2
* Final leaderboard with highlighted loser(s)
* Mobile‑friendly interface for use during matches

## Use Case

This app is useful for groups of friends who play casual snooker variations and want a **simple digital scoreboard** that handles scoring rules automatically.

Instead of manually calculating score differences and totals after every frame, the app does the calculations instantly and shows the final standings.

## Future Improvements

* Save match history
* Player statistics
* Leaderboards
* Share match results
* Multiplayer online scoreboard

---

If you play this snooker variation regularly, this tool helps keep scoring simple so players can focus on the game.

## Screens

Screenshots of the following screens at the end of this file:

1. Home / Start Game 
2. Player Setup 
3. Frame 1 Scoring 
4. Frame 1 Results 
5. Frame 2 Scoring 
6. Final Results / Leaderboard 
7. History of Games today 

![Home](/public/main.png)
![Player Setup](/public//add-player.png)
![Frame 1 Scoring](/public/scoring.png)
![Frame 1 Result](/public/frame-1-result.png)
![Frame 2 Scoring](/public/score-frame-2.png)
![Final Result](/public/final-result.png)
![History](/public/history.png)