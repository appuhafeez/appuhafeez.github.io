echo "$(head -"$( grep -n "\-\-\-" "$1" | cut -d: -f 1 | sed -n '2p')" "$1")" | yq r - "$2"
