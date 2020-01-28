
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
