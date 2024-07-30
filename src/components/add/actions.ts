'use server'

import { s3Client } from "@/db"
import { createBrand } from "@/db/queries/brand"
import { createItem } from "@/db/queries/item"
import { InsertBrand, InsertItem } from "@/db/schema"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { revalidatePath } from "next/cache"
import sharp from "sharp"

async function uploadFiles(
  file: Buffer,
  fileName: string,
  dimensions: [x: number, y: number]) 
{
  const fileBuffer = await sharp(file)
    .jpeg({quality: 50})
    .resize(dimensions[0], dimensions[1])
    .toBuffer();

  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: `${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  })

  try {
    const response = await s3Client.send(command);
    console.log(response)

    return fileName;
  } catch (error) {
    throw error;
  }
}

export async function AddBrandAction(data: FormData) {
  /** TODO: Check if images are actually captured. */
  /** TODO: Take a look at image sizing. */
  const thumbnailData = await uploadFiles(
    Buffer.from(await (data.get("thumbnail")! as File).arrayBuffer()),
    `thumbnail_${(data.get("name")! as string).replace("/\s*/g", "")}`,
    [200, 200]
  )
  const image1Data = await uploadFiles(
    Buffer.from(await (data.get("image1")! as File).arrayBuffer()),
    `image_${(data.get("name")! as string).replace("/\s*/g", "")}_1`,
    [200, 800]
  )
  const image2Data = await uploadFiles(
    Buffer.from(await (data.get("image2")! as File).arrayBuffer()),
    `image_${(data.get("name")! as string).replace("/\s*/g", "")}_2`,
    [200, 800]
  )
  const [thumbnail, image1, image2] = await Promise.all([thumbnailData, image1Data, image2Data])

  const insert: InsertBrand = {
    name: data.get("name")! as string,
    value: data.get("value")! as string,
    instagram: data.get("instagram")! as string,
    website: data.get("website")! as string,
    thumbnail: thumbnail,
    images: [image1, image2],
  }
  
  await createBrand(insert)
  revalidatePath('/')
}

export async function AddItemAction(data: FormData) {
  const image1Data = await uploadFiles(
    Buffer.from(await (data.get("image1")! as File).arrayBuffer()),
    `image_${(data.get("name")! as string).replace("/\s*/g", "")}_1`,
    [200, 800]
  )
  const image2Data = await uploadFiles(
    Buffer.from(await (data.get("image2")! as File).arrayBuffer()),
    `image_${(data.get("name")! as string).replace("/\s*/g", "")}_2`,
    [200, 800]
  )
  const [image1, image2] = await Promise.all([image1Data, image2Data])

  /** TODO: Fix tags */
  const insert: InsertItem = {
    name: data.get("name")! as string,
    brand: parseInt(data.get("brand")! as string),
    link: data.get("link")! as string,
    images: [image1, image2],
    tags: [],
  }
  createItem(insert)
}