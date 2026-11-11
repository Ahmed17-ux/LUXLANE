import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";

  export function Product() {

    return (
      <>

<div className="m-4 w-auto h-full flex flex-col items-center justify-between lg:flex-row   ">
{/* Last Product Added */}
<Card className="w-full lg:w-[50%] m-2 bg-[#047dc5]">
    <List>

        <Typography variant="h5" className="p-2 text-gray-200">
            Last Product Added :
        </Typography>

        <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="produtc 1" src="" />
            </ListItemPrefix>
            <div className="w-full flex items-center justify-between">
              <div>
                    <Typography variant="h6" className="text-gray-400">
                    Pc Portable
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal ">

                    Pc Portable Pc Portable Pc Portable
                    </Typography>
              </div>
              <div>
                    <Typography variant="small" color="gray" className="font-normal ">
                        23/4/2045
                    </Typography>
              </div>
            </div>
        </ListItem>

        <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="produtc 1" src="" />
            </ListItemPrefix>
            <div className="w-full flex items-center justify-between">
              <div>
                    <Typography variant="h6" className="text-gray-400">
                    Pc Portable
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal ">

                    Pc Portable Pc Portable Pc Portable
                    </Typography>
              </div>
              <div>
                    <Typography variant="small" color="gray" className="font-normal ">
                        23/4/2045
                    </Typography>
              </div>
            </div>
        </ListItem>


    </List>
</Card>


{/* Offres */}
<Card className="w-full lg:w-[50%] m-2 bg-[#22c1c3]">
        <List>

            <Typography variant="h5" className="p-2">
        Offres:
            </Typography>

            <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="produtc 1" src="" />
            </ListItemPrefix>
            <div className="w-full flex items-center justify-between">
              <div>
                    <Typography variant="h6" className="text-gray-400">
                    Pc Portable
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal ">

                    Pc Portable Pc Portable Pc Portable
                    </Typography>
              </div>
              <div>
                    <Typography variant="small" color="gray" className="font-normal ">
                        4 week
                    </Typography>
              </div>
            </div>
          </ListItem>

          <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="produtc 1" src="" />
            </ListItemPrefix>
            <div className="w-full flex items-center justify-between">
              <div>
                    <Typography variant="h6" className="text-gray-400">
                    Pc Portable
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal ">

                    Pc Portable Pc Portable Pc Portable
                    </Typography>
              </div>
              <div>
                    <Typography variant="small" color="gray" className="font-normal ">
                        23/4/2045
                    </Typography>
              </div>
            </div>
          </ListItem>

        </List>
      </Card>
      </div>

      </>
    );
  }
