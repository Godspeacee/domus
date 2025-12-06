import prisma from "@/prisma/clientfile";
import { Box, Card, Text, Flex, Avatar } from "@radix-ui/themes";

const AdminBookingsPage = async () => {
  const bookings = await prisma.payment.findMany({
    include: {
      property: { include: { agent: true } },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Box p="4">
      <Text size="6" weight="bold" mb="4">
        Bookings
      </Text>

      <Flex direction="column" gap="4">
        {bookings.map((booking) => (
          <Card key={booking.id} size="3" className="p-4">
            <Flex justify="between">
              <Box>
                <Text size="4" weight="bold">
                  {booking.property.title}
                </Text>
                <Text>{booking.property.state}</Text>
                <Text>{booking.property.address}</Text>
                <Text>Category: {booking.property.category}</Text>
              </Box>
              <Box>
                <Text>
                  <strong>Agent:</strong> {booking.property.agent?.name}
                </Text>
                <Text>
                  <strong>Email:</strong> {booking.property.agent?.email}
                </Text>
              </Box>

              <Box>
                <Text>
                  <strong>Customer:</strong> {booking.email}
                </Text>
                <Text>
                  <strong>Amount:</strong> ₦{booking.amount.toLocaleString()}
                </Text>
                <Text>
                  <strong>Status:</strong> {booking.status}
                </Text>
                <Text>
                  <strong>Date:</strong>{" "}
                  {booking.createdAt.toLocaleDateString()}
                </Text>
                <Avatar
                  src={booking.property.agent?.image!}
                  alt="Agent Photo"
                  fallback="?"
                  size={"2"}
                  radius="full"
                  className="cursor-pointer"
                  referrerPolicy="no-referrer"
                />
              </Box>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default AdminBookingsPage;
