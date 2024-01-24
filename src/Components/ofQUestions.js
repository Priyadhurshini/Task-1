import React from "react";

const Questions ={

    questions : [
            
        {
            questionNumber: 1,
            question : "What would you like to do?",
            choices:
                [
                    {
                        text: "I want to classify documents.",
                        price: 0
                    },

                    {
                        text: "I want to extract data from documents.",
                        price: 0
                    },

                    {
                        text: "Both",
                        price: 0
                    }
                ],
            choice : null,
            choiceCondition: null,
            dependentQuestion : 0,
            dependentChoice : null
            
        },

        {
            questionNumber: 2,
            question : "How will you provide documents for processing?",
            choices:
                [
                    {
                        text: "I can place documents in a folder.",
                        price: 0
                },

                    {
                        text: "We have APIs to transfer documents.",
                        price: 0
                    },

                    {
                        text: "We may need custom connectors.",
                        price: 1280 //per connector
                    }
                ],
            choice : null,
            choiceCondition : "We may need custom connectors.",
            dependentQuestion : 0,
            dependentChoice : null
            
        },

        {
            questionNumber: 3,
            question : "How many source application you would need to connect to?",
            choices:
            [
                {
                        text: "Drop Down from 1 to 10",
                        price: 0
                }
            ],
            choice : null,
            choiceCondition : null,
            dependentQuestion : 0,
            dependentChoice : null
           
        },

        {
            questionNumber: 4,
            question : "Tell us about document quality:",
            choices :
            [
                {
                    text: "Documents are clean and of good quality.",
                    price: 0
                },

                {
                    text: "We need to improve document quality.",
                    price: 2160
                }
            ],
            choice : null,
            choiceCondition : null,
            dependentQuestion : 1,
            dependentChoice : "I want to extract data from documents."
           
        },

        {
            questionNumber: 5,
            question : "Document classification:",
            choices :
            [
                {
                    text: "Single-page documents.",
                    price: 0.02 // per page
                },

                {
                    text: "PDF packages with multiple documents",
                    price: 0.04
                }
            ],
            choice : null,
            choiceCondition : null,
            dependentQuestion : 1,
            dependentChoice : "I want to classify documents."
           
        },

        {
            questionNumber: 6,
            question : "Data extraction preferences:",
            choices :
            [
                {
                    text: "Extract everything for readability.",
                    price: 0.02 // per page
                },

                {
                    text: "Extract specific fields.",
                    price: 0.04 // per page
                },

                {
                    text: "Complex extraction (tables, JSON, CSV, etc.).",
                    price: 0.06  //per page
                },

                {
                    text: "Extract handwritten information.",
                    price: 0.10  //per page
                }
            ],
            choice : null,
            choiceCondition : null,
            dependentQuestion : 0,
            dependentChoice : null
        
        },

        {
            questionNumber: 7,
            question : "Need data validation?",
            choices :
            [
                {
                    text: "Yes, basic checks (e.g., expiry).",
                    price: 0.001 //per data validated
                },

                {
                    text: "Yes, cross-reference with multiple sources.",
                    price: 0.005 //per data validated
                },

                {
                    text: "No, validation not needed.",
                    price: 0
                },

            ],
            choice : null,
            choiceCondition : null,
            dependentQuestion : 0,
            dependentChoice : null
           
        },

        {
            questionNumber: 8,
            question : "Require human verification?",
            choices :
            [
                {
                    text: "Yes, accuracy is crucial.",
                    price: 6000
                },

                {
                    text: "No, further internal validation is enough",
                    price: 0
                }
            ],
            choice : null,
            choiceCondition : null,
            dependentQuestion : 0,
            dependentChoice : null
           
        },

        {
            questionNumber: 9,
            question : "Data transformation before use?",
            choices :
            [
                {
                    text: "Yes, let's transform the data.",
                    price: 0.005 //per data field transformed
                },

                {
                    text: "No, use data as-is.",
                    price: 0
                }
            ],
            choice : null,
            choiceCondition : null,
            dependentQuestion : 0,
            dependentChoice : null
           
        },

        {
            questionNumber: 10,
            question : "Load data into target systems?",
            choices :
            [
                {
                    text: "Yes, automate data load via API.",
                    price:0.005 //per data field loaded via API
                },

                {
                    text: "No, raw output is sufficient.",
                    price: 0
                }
            ],
            choice : null,
            choiceCondition : null,
            dependentQuestion : 0,
            dependentChoice : null
           
        },

        {
            questionNumber: 11,
            question : "Enable reporting?",
            choices :
            [
                {
                    text: "Yes, basic reporting of document flow.",
                    price:0
                },

                {
                    text: "Custom dashboard.",
                    price: 2560
                }
            ],
            choice : null,
            choiceCondition : null,
            dependentQuestion : 0,
            dependentChoice : null
           
        },

        {
            questionNumber: 12,
            question : "Store data and documents?",
            choices :
            [
                {
                    text: "No, not needed.",
                    price:0
                },
                {
                    text: "Yes",
                    price:0
                },
            ],
            choice : null,
            choiceCondition : "No, not needed.",
            dependentQuestion : 0
           
        },

        {
            questionNumber: 13,
            question : "Frequency of data and document usage?",
            choices :
            [
                {
                    text: "Daily for 1-2 months",
                    price: 600 //per year
                },
                {
                    text: "Occasionally every 6 months",
                    price: 420 //per year
                },
                {
                    text: "For compliance, infrequent (once a year)",
                    price: 300 //per year
                }
            ],
            choice : null,
            choiceCondition : null,
             dependentQuestion : 0,
             dependentChoice : null
           
        },

        {
            questionNumber: 14,
            question : "Enable intelligence services on data?",
            choices :
            [
                {
                    text: "Yes, exploratory data analysis or prediction.",
                    price: 200 //per month
                },
                {
                    text: "No, not needed.",
                    price: 0
                }
            ],
            choice : null,
            choiceCondition : null,
             dependentQuestion : 0,
             dependentChoice : null
           
        },

        {
            questionNumber: 15,
            question : "Will you provide necessary infrastructure for deployment?",
            choices :
            [
                {
                    text: "Yes, host within my environment.",
                    price: 0
                },
                {
                    text: "Looking for turnkey automation",
                    price: 0
                }
            ],
            choice : null,
            choiceCondition : "Yes, host within my environment.",
            dependentQuestion : 0,
            dependentChoice : null
        
        },

        {
            questionNumber: 16,
            question : "Document types and scale:",
            choices :
            [
                {
                    text: "Readable documents, low volume.",
                    price: 100 // per month
                },
                {
                    text: "Readable documents, high volume.",
                    price: 250 // per month
                },
                {
                    text : "Scanned documents/images, low volume.",
                    price : 300 // per month
                }
            ],
            choice : null,
            choiceCondition : null,
             dependentQuestion : 0,
             dependentChoice : null
           
        },

        {
            questionNumber:17,
            question : "What level of post-implementation support do you need?",
            choices :
            [
                {
                    text: "Basic support.",
                    price: 0
                },
                {
                    text: "Shared support.",
                    price: 528 // per month
                },
                {
                    text : "Privileged support.",
                    price : 1408 // per month
                }
            ],
            choice : null,
            choiceCondition : null,
            dependentQuestion : 0,
            dependentChoice : null
        }





    ]
}

export default Questions
