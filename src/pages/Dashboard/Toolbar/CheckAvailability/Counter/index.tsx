import { Button, Text, Flex } from "@chakra-ui/react";

interface CounterProps {
    count: number;
    setCount: (value: number) => void;
  }

const Counter: React.FC<CounterProps> = ({ count, setCount }) => {


  return (
    <Flex gap={2} justifyContent='center' alignItems='center' boxShadow="md">
      <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => setCount(count + 1)}
        mr={2}
      >
        +
      </Button>
      <Text textAlign='center'>{count}</Text>
      <Button
        colorScheme="red"
        variant="outline"
        onClick={() => setCount(count - 1)}
        disabled={count === 1}
        mr={2}
      >
        -
      </Button>
    </Flex>
  );
};

export default Counter;
