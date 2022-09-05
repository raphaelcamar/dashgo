import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData }: ProfileProps){
  return (
    <Flex align="center">
      {showProfileData ? (
        <Box mr="4" textAlign="right">
        <Text>Raphael Santantonio</Text>
        <Text color="gray.300" fontSize="small">raphaelcamar@outloo.com</Text>
      </Box>
      ) : (
        <></>
      )}
      

      <Avatar size="md" name="Raphael Santantonio" src="https://github.com/raphaelcamar.png " />
    </Flex>
  );
}