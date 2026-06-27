import PhotoCameraOutlinedIcon from "@mui/icons-material/PhotoCameraOutlined";
import { USER_PROFILE } from "./settingsData";

const cardClass =
  "rounded-lg border border-outline-variant/50 bg-surface p-6 shadow-[0_4px_6px_-1px_rgba(53,37,205,0.05),0_2px_4px_-1px_rgba(53,37,205,0.03)]";

export default function ProfileOverviewCard() {
  return (
    <article className={`${cardClass} flex flex-col items-center text-center`}>
      <div className="group relative mb-4 cursor-pointer">
        <img
          src={USER_PROFILE.avatar}
          alt={USER_PROFILE.name}
          className="h-24 w-24 rounded-full border-2 border-primary object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-inverse-surface/50 opacity-0 transition-opacity group-hover:opacity-100">
          <PhotoCameraOutlinedIcon className="text-on-primary" sx={{ fontSize: 28 }} />
        </div>
      </div>
      <h3 className="text-h3 font-semibold text-on-surface">{USER_PROFILE.name}</h3>
      <p className="text-body-md text-on-surface-variant">{USER_PROFILE.email}</p>
      <p className="mt-1 inline-block rounded-full bg-primary-container/10 px-2 py-1 text-caption text-primary">
        {USER_PROFILE.role}
      </p>
    </article>
  );
}
