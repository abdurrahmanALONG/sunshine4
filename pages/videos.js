import ShowVideos from '../components/ShowVideos';
import { connectToDatabase } from "../util/mongodb";
import AddVideo from '../components/AddVideo'

export default function video({videos}) {

  return (
    <div>
      <AddVideo cat="programming" />
      <ShowVideos videos={videos} />
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();
  const videos = await db.collection('videos').find({cat:"programming"}).toArray();
  return {
    props: {
      videos: JSON.parse(JSON.stringify(videos))
    },
  };
}