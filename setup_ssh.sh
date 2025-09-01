#!/bin/bash
ssh-agent -s > ~/.ssh/agent_vars
source ~/.ssh/agent_vars
ssh-add ~/.ssh/id_ed25519
