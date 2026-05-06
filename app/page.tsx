import {
  Box,
  Heading,
  Card,
  Button,
  Link,
  Grid,
  Flex,
  Avatar,
  Text,
} from "@radix-ui/themes";
import { Metadata } from "next";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* hero section */}
      <Grid
        columns={{ initial: "1", sm: "2" }}
        className="background-header"
        data-aos="fade-up"
      >
        <Box>
          <Heading as="h1" className="text-teal-700">
            {" "}
            From Long-Term Rentals to Short Getaways - Domus Has You
            Covered.{" "}
          </Heading>
          <Heading as="h4" className="my-margin">
            Browse listings, book viewing sessions, compare prices, and move in
            or stay comfortably, all without stress.
          </Heading>
          <Button>
            <Link href="/properties/list">Go to property</Link>
          </Button>
        </Box>
        <Image
          src="/ladyonherlaptop.svg.png"
          alt="lady on her laptop"
          width={500}
          height={500}
        ></Image>
      </Grid>
      {/* how domus works */}
      <Box className="my-margin" data-aos="fade-right">
        <Heading className="my-margin" as="h3">
          How Domus Helps You Find the Perfect Home
        </Heading>
        <Grid columns={{ initial: "1", md: "3" }} gap={"3"}>
          <Box>
            <Card>
              <Flex gap={"2"} align={"center"}>
                <Avatar variant="soft" radius="full" fallback="1" />
                <Box>
                  <Heading as="h3" weight={"regular"}>
                    Search Homes
                  </Heading>
                </Box>
              </Flex>
              <Text>
                Browse available listings based on your budget and state.
              </Text>
            </Card>
          </Box>
          <Box>
            <Card>
              <Flex gap={"2"} align={"center"}>
                <Avatar variant="soft" radius="full" fallback="2" />
                <Box>
                  <Heading as="h3" weight={"regular"}>
                    Book Inspection
                  </Heading>
                </Box>
              </Flex>
              <Text>Pay small booking fee to view the property.</Text>
              <Text>For AIRBNB agents will mark it rented if it's in use.</Text>
            </Card>
          </Box>
          <Box>
            <Card>
              <Flex gap={"2"} align={"center"}>
                <Avatar variant="soft" radius="full" fallback="3" />
                <Box>
                  <Heading as="h3" weight={"regular"}>
                    Rent Easily
                  </Heading>
                </Box>
              </Flex>
              <Text>If it's the right fit, pay the landlord directly.</Text>
            </Card>
          </Box>
        </Grid>
      </Box>
      {/* Features */}
      <Box className="my-margin" data-aos="zoom-in-down">
        <Heading>Features</Heading>
        <Grid columns={{ initial: "1", md: "2" }}>
          <Flex align={"center"} gap={"2"}>
            <Avatar
              size={"1"}
              src="/check.svg"
              fallback="T"
              variant="soft"
              radius="full"
            />
            <Text>Affordable homes for every budget</Text>
          </Flex>
          <Flex gap={"2"}>
            <Avatar
              size={"1"}
              src="/check.svg"
              fallback="T"
              variant="soft"
              radius="full"
            />
            <Text>Direct agent listings</Text>
          </Flex>
          <Flex gap={"2"}>
            <Avatar
              size={"1"}
              src="/check.svg"
              fallback="T"
              variant="soft"
              radius="full"
            />
            <Text>Simple booking system to view houses</Text>
          </Flex>
          <Flex gap={"2"}>
            <Avatar
              size={"1"}
              src="/check.svg"
              fallback="T"
              variant="soft"
              radius="full"
            />
            <Text>Mobile-friendly experience</Text>
          </Flex>
        </Grid>
      </Box>
      {/* Grow your business */}
      <Box data-aos="zoom-in-up" className="my-margin-footer">
        <Flex justify={"center"}>
          <Heading>Grow Your Real Estate Business With Domus</Heading>
        </Flex>
        <Flex justify={"center"}>
          <Text>
            List properties, reach more clients, and earn faster with our secure
            and easy to use platform
          </Text>
        </Flex>
      </Box>
      {/*footer */}
      <Box data-aos="fade-up">
        <Grid columns={{ initial: "1", md: "3" }} gap={"3"}>
          <Card>
            {" "}
            <Flex direction={"column"}>
              {" "}
              <Text weight={"bold"}>Agent guidelines</Text>
              <Box>
                {" "}
                <ul>
                  <li>Only upload accurate and truthful property details</li>
                  <li>All images must reflect current property condition</li>
                  <li>
                    Agents agree not to mislead users or hide important
                    information
                  </li>
                  <li>
                    Repeated complaints can and will lead to account
                    restrictions or permanent bans
                  </li>
                </ul>
              </Box>
            </Flex>
          </Card>
          <Card>
            {" "}
            <Flex direction={"column"}>
              {" "}
              <Text weight={"bold"}>Refund & booking policy</Text>
              <Box>
                {" "}
                <ul>
                  <li>
                    House hunters pay a small booking fee to inspect a proprty
                  </li>
                  <li>
                    If the house condition matches the description {"->"}{" "}
                    booking fee is non-refundable{" "}
                  </li>
                  <li>
                    If the property is misleading, unavailable, or fake {"->"}{" "}
                    full booking fee refund - tranfer fees, please note refunds
                    will take time
                  </li>
                  <li>
                    Multiple verified refund claims against the same agent
                    results to account restriction or permanent ban
                  </li>
                </ul>
              </Box>
            </Flex>
          </Card>
          <Card>
            {" "}
            <Flex direction={"column"}>
              {" "}
              <Text weight={"bold"}>Payments</Text>
              <Box>
                {" "}
                <ul>
                  <li>
                    Agents receive earnings monthly, after all inspection and
                    booking reports are verified
                  </li>
                  <li>
                    Payments go directly to the agent's registered bank account
                    after Domus 10% fee as been deducted
                  </li>
                </ul>
              </Box>
              <Flex direction={"column"}>
                <Text weight={"bold"}>contact & support</Text>
                <ul>
                  <li>
                    <Text weight={"medium"}>Support Email:</Text>
                  </li>
                  <li>
                    <Text weight={"medium"}>Report Fraud:</Text>
                  </li>
                  <li>
                    <Text weight={"medium"}>Partherships:</Text>
                  </li>
                </ul>
              </Flex>
            </Flex>
          </Card>
        </Grid>
      </Box>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Domus - Dashboard",
  openGraph: {
    type: "website",
    url: "https://example.com",
    title: "Domus Website",
    description: "A housing website for both house hunters and agents",
    siteName: "Domus Website",
    images: [{ url: "https://example.com/og.png" }],
  },
  description: " Browse, pay, expolre",
};
