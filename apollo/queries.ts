export const ANILIST_MEDIA_QUERY = (mediaId: number) => `
    Media(id: ${mediaId}) {
      volumes
      updatedAt
      type
      trending
      trailer {
        thumbnail
        site
        id
      }
      title {
        romaji
        native
        english
      }
      tags {
        name
        rank
        id
        isAdult
        isGeneralSpoiler
        isMediaSpoiler
        description
        category
      }
      synonyms
      studios {
        pageInfo {
          total
          perPage
          lastPage
          hasNextPage
          currentPage
        }
        nodes {
          siteUrl
          name
          id
        }
      }
      status
      startDate {
        year
        month
        day
      }
      staff {
        pageInfo {
          total
          perPage
          lastPage
          hasNextPage
          currentPage
        }
        edges {
          role
          node {
            id
            image {
              medium
              large
            }
            name {
              native
              middle
              last
              full
              first
              alternative
            }
          }
        }
      }
      source
      siteUrl
      seasonYear
      season
      popularity
      meanScore
      isLicensed
      isAdult
      idMal
      id
      genres
      format
      externalLinks {
        url
        type
        siteId
        site
        id
        icon
        color
      }
      endDate {
        year
        month
        day
      }
      episodes
      duration
      description
      coverImage {
        medium
        large
        extraLarge
        color
      }
      countryOfOrigin
      chapters
      bannerImage
      averageScore
      characters {
        pageInfo {
          total
          perPage
          lastPage
          hasNextPage
          currentPage
        }
        edges {
          role
          node {
            name {
              native
              middle
              last
              full
              first
              alternativeSpoiler
              alternative
            }
            image {
              large
              medium
            }
            id
            gender
            favourites
            description
            dateOfBirth {
              year
              month
              day
            }
            bloodType
            age
          }
        }
      }
    }`;
