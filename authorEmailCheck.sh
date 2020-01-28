#!/bin/bash
# Script to prevent developpers from commiting with their wrong emails. Pipeline will fail if a user commits with an email other than "...@polymtl.ca"

RESULT=$(git shortlog -sne --all | grep -v "polymtl")

set -eu
set -o pipefail
if [ -z "$RESULT" ]; then
    echo "authors: OK"
    exit 0
fi

echo $RESULT
echo "WRONG EMAIL"
exit 1
