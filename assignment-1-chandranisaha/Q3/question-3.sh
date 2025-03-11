#!/bin/bash

#define possible actions for the players: "stop" and "go"
actions=("Stop" "Go")  #this array holds the two possible actions for the players, stop or go

# function to simulate the stoplight game
stoplight_game() 
{
    # randomly choose actions for both players, using the actions array
    player1_action=${actions[$RANDOM % 2]}  # randomly select an action for player 1 (either "Stop" or "Go")
    player2_action=${actions[$RANDOM % 2]}  # randomly select an action for player 2 (either "Stop" or "Go")

    # initialize the payoffs for both players
    payoff1=0  # initially set player 1's payoff to 0
    payoff2=0  # initially set player 2's payoff to 0

    # determine the payoffs based on the actions of both players
    if [[ "$player1_action" == "Stop" && "$player2_action" == "Stop" ]]; then
        payoff1=-1   # if both players stop, no accident happens, neither gains nor loses
        payoff2=-1
    elif [[ "$player1_action" == "Stop" && "$player2_action" == "Go" ]]; then
        payoff1=0  # if player 1 stops and player 2 goes, player 1 loses, player 2 gains
        payoff2=1
    elif [[ "$player1_action" == "Go" && "$player2_action" == "Stop" ]]; then
        payoff1=1   # if player 1 goes and player 2 stops, player 1 gains, player 2 loses
        payoff2=0
    else
        payoff1=-5  # if both players go, a crash happens, both lose points
        payoff2=-5
    fi

    # print the actions chosen by both players
    echo "Player 1 action: $player1_action"  # display player 1's choice
    echo "Player 2 action: $player2_action"  # display player 2's choice

    # print the payoffs for both players based on their actions
    echo "Player 1 score: $payoff1"  # display the payoff for player 1
    echo "Player 2 score: $payoff2"  # display the payoff for player 2

    # check if the outcome is a Nash equilibrium
    if [[ "$player1_action" == "Stop" && "$player2_action" == "Stop" ]] || \
       [[ "$player1_action" == "Go" && "$player2_action" == "Go" ]]; then
        # if both players stop or both go, this is a Nash equilibrium (stable outcome)
        echo "Nash equilibrium reached."  # both players are at a stable state where neither can improve their situation by changing their strategy
    else
        # if one player can improve their payoff by changing their action, this is not a Nash equilibrium
        echo "Nash equilibrium NOT reached."  # at least one player can improve their payoff by changing their action
    fi
}

	echo "Spotlight Game:"

# run the stoplight game simulation
stoplight_game  # call the function to simulate the game with random actions for both players
