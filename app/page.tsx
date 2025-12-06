import { Box, Heading, Card, Button, Link } from "@radix-ui/themes";

export default function Home() {
  const links = [
    { label: "Properties", href: "/propertise/list", key: "propertise" },
  ];
  return (
    <div>
      <Box className="background-header " height={"200px"} data-aos="fade-up">
        <Card className="h-96px">
          <Heading as="h1" className="text-teal-700">
            {" "}
            Find Your Next Home With Ease{" "}
          </Heading>
          <Heading as="h4" className="">
            Search verified homes within your budget and book inspections
            instantly on Domus.
          </Heading>
          <Button>
            <Link href="/propertise/list">Go to property</Link>
          </Button>
        </Card>
      </Box>
    </div>
  );
}
