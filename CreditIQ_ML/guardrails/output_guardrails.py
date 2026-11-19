def validate_output(answer):

    # Check if response is empty
    if not answer or not answer.strip():
        return False

    # Check response type
    if not isinstance(answer, str):
        return False

    # Check excessive response length
    if len(answer) > 5000:
        return False

    return True