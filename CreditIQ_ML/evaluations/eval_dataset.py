evaluation_dataset = [
    {
        "input": "What is the annual milestone benefit?",
        "expected_output": (
            "The cardholder receives one complimentary "
            "flight ticket worth Rs. 5,000 after achieving "
            "net retail spends of Rs. 7,50,000 during "
            "the card anniversary year."
        ),
        "context": [
            """
            All Regalia Gold card members can avail one
            complimentary flight ticket worth Rs. 5,000
            provided their net retail spends reach
            Rs. 7,50,000 in a card anniversary year.
            """
        ]
    },
    {
        "input": "When does the annual milestone benefit unlock?",
        "expected_output": (
            "The benefit unlocks within 48 hours after "
            "the cardholder achieves the required spending milestone."
        ),
        "context": [
            """
            Benefits will be unlocked within 48 hours
            on achievement of annual spends milestone.
            """
        ]
    },
    {
        "input": "Are EMI transactions included in milestone spending?",
        "expected_output": (
            "No. EMI transactions are not included "
            "in milestone spending."
        ),
        "context": [
            "EMI transactions are not included in milestone spends."
        ]
    }
]
