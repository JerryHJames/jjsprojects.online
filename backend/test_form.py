import requests
import json

def test_contact_form():
    # Test data
    test_cases = [
        {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "Test Message"
        },
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "subject": "Another Test",
            "message": "This is another test message"
        }
    ]
    
    # API endpoint
    url = "http://127.0.0.1:8000/api/contact"
    
    # Run tests
    for test_case in test_cases:
        try:
            print(f"\n=== Testing submission for {test_case['name']} ===")
            print(f"Request data: {json.dumps(test_case, indent=2)}")
            
            # Make the request
            response = requests.post(
                url,
                json=test_case,
                headers={"Content-Type": "application/json"}
            )
            
            # Print response details
            print(f"\nResponse Status: {response.status_code}")
            print(f"Response Headers: {json.dumps(dict(response.headers), indent=2)}")
            
            try:
                response_data = response.json()
                print(f"Response Body: {json.dumps(response_data, indent=2)}")
            except json.JSONDecodeError:
                print(f"Raw Response Body: {response.text}")
            
            # Check if successful
            if response.ok:
                print("\n✅ Test passed!")
            else:
                print("\n❌ Test failed!")
                if 'detail' in response_data:
                    error_detail = response_data['detail']
                    try:
                        # Try to parse the error detail if it's a JSON string
                        error_obj = json.loads(error_detail.replace("'", '"'))
                        print(f"\nError Code: {error_obj.get('code')}")
                        print(f"Error Message: {error_obj.get('message')}")
                        print(f"Error Details: {error_obj.get('details')}")
                        print(f"Error Hint: {error_obj.get('hint')}")
                    except:
                        print(f"\nError Detail: {error_detail}")
            
        except requests.exceptions.RequestException as e:
            print(f"\n❌ Request Error: {str(e)}")
        except Exception as e:
            print(f"\n❌ Unexpected Error: {str(e)}")
        
        print("\n" + "="*50)

if __name__ == "__main__":
    test_contact_form() 