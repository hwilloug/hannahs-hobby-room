if [ -z "$1" ]; then
    echo "Error: Please provide an article slug as the first argument"
    exit 1
fi

slug=$1
aws lambda invoke --function-name newsletter_send_new_article_email --payload "{\"slug\":\"$slug\"}" --cli-binary-format raw-in-base64-out test.json