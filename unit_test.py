from colorama import Fore
from colorama import Style

TEXT_SUCCESSFUL = "{}succesful{}!".format(Fore.GREEN, Style.RESET_ALL)

def test_failed(output):
    return "{}{}{}!".format(Fore.RED, output, Style.RESET_ALL)

def test_multiple(func,tests):
    for entry in tests:
        value = entry[0]
        expected = entry[1]
        actual = func(*value) 
        if actual == expected:
            print("Test [{}] {}".format(str(value), TEXT_SUCCESSFUL))
        else:
            print(test_failed("Test [{}] failed! Expected {} but calculated {} ...".format(str(value),expected,actual)))
            break
    else:
        print("All tests successful!")
        
def test(func,test,name):
    value = test[0]
    expected = test[1]
    actual = func(value) 
    if actual == expected:
        print("Test [{}] {}".format(name, TEXT_SUCCESSFUL))
    else:
        print(test_failed("Test [{}] failed! Expected {} but calculated {} ...".format(name,expected,actual)))
        return
    
def test_instance_method(instance_method_call, expected, name):
    actual = instance_method_call
    if actual == expected:
        print("Test [{}] {}".format(str(name), TEXT_SUCCESSFUL))
    else:
        print(test_failed("Test [{}] failed! Expected {} but calculated {} ...".format(str(name),expected,actual)))
        return