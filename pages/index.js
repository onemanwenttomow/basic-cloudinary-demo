import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <ul>
        <li>
          <Link href="/upload">Upload</Link>
        </li>
        <li>
          <Link href="/upload-multiple">Upload Multiple</Link>
        </li>
      </ul>
    </div>
  );
}
