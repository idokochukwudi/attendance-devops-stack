#!/bin/bash
set -e

# Drop privileges and run Jenkins as the 'jenkins' user
exec gosu jenkins "$@"
