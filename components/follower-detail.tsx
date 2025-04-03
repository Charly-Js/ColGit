import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "@/utils/use-translation"
import { DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface Follower {
  id: string
  name: string
  avatar: string
  isFollowing: boolean
  isPrivate: boolean
}

interface FollowerDetailProps {
  follower: Follower
}

export function FollowerDetail({ follower }: FollowerDetailProps) {
  const { t } = useTranslation()

  // Simulated follower details
  const followerDetails = follower.isPrivate
    ? {
        email: "",
        location: "",
        profession: "",
        joinDate: "",
      }
    : {
        email: "user@example.com",
        location: "New York, USA",
        profession: "Software Developer",
        joinDate: "January 2023",
      }

  return (
    <>
      <DialogTitle className="flex items-center space-x-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={follower.avatar} alt={follower.name} />
          <AvatarFallback>{follower.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{follower.name}</h3>
          <DialogDescription>{follower.isPrivate ? t("private_profile") : t("public_profile")}</DialogDescription>
        </div>
      </DialogTitle>
      <div className="mt-6">
        <dl className="grid grid-cols-1 gap-4 text-sm">
          <div>
            <dt className="font-medium text-gray-500">{t("email")}</dt>
            <dd>{followerDetails.email || t("information_not_available")}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">{t("location")}</dt>
            <dd>{followerDetails.location || t("information_not_available")}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">{t("profession")}</dt>
            <dd>{followerDetails.profession || t("information_not_available")}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">{t("join_date")}</dt>
            <dd>{followerDetails.joinDate || t("information_not_available")}</dd>
          </div>
        </dl>
      </div>
    </>
  )
}

