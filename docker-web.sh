ngrok http 4001 > /dev/null &
sleep 3
export WEBHOOK_URL="$(curl http://localhost:4040/api/tunnels | jq ".tunnels[0].public_url")"
echo "${WEBHOOK_URL}"
